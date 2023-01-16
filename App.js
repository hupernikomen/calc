import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, StatusBar, Switch } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

const width = Dimensions.get('window').width
var listValRef;
var listHistRef;

export default function App() {

  const [digito, setDigito] = useState([])
  const [ultimo, setUltimo] = useState('')
  const [parcelas, setParcelas] = useState([]) // Todos os valores digitados para soma
  const [historico, setHistorico] = useState([])


  const [dark, setDark] = useState(false)
  const [thema, setThema] = useState({
    backgroundColor: "#fff",
    efeito: "#fafafa",
    color: '#222',
    especial: 'orange'
  })
  const toggleSwitch = () => setDark(previousState => !previousState);


  useEffect(() => {
    if (dark) {
      setThema({
        backgroundColor: "#222",
        efeito: "#f1f1f1",
        color: '#fff',
        especial: '#FF8C00'
      })
    } else {
      setThema({
        backgroundColor: "#fff",
        efeito: "#fafafa",
        color: '#222',
        especial: '#FF6347'
      })
    }
  }, [dark])

  useEffect(() => {
    downButtonHandler()

  })

  useEffect(() => {
    setUltimo(digito.join(''))
    
  }, [digito])
  
  function apagarDigito() {
    digito.splice(-1, 1);
    // const corte2 = digito.pop()
    // const corte = digito.toString().substring(0, digito.length - 1)
    // setDigito(meuPeixe)
  }
  
  function montaParcelas() {
    if (ultimo != '') {
      setParcelas(parcelas => [...parcelas, parseFloat(ultimo).toFixed(2)])
      setUltimo("")
      setDigito([])
    }
  }


  const downButtonHandler = () => {
    listValRef.scrollToEnd({ animated: true });
    listHistRef.scrollToEnd({ animated: true });
  };

  function Registrar() {

    if (digito.length == 0 && parcelas.length == 0) {
      return
    }

    let time = {
      data: new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      hora: new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })
    }

    let soma = 0
    for (let i = 0; i < parcelas.length; i++) {
      soma += parseFloat(parcelas[i]);
    }

    setHistorico(historico => [...historico, {
      soma: parcelas.length > 0 ? soma : parseFloat(ultimo),
      time,
      parcelas
    }])


    setParcelas([])
    setUltimo('')
    setDigito([])

  }

  function Historico({ data, index }) {
    return (



      <TouchableOpacity
        style={{
          flexDirection: 'row',
        }}
        onPress={() => { }}>



        <View>

          <Text style={{ fontSize: 12, color: '#ccc', marginTop: 5 }}>{data.time.data.slice(0, 5)} - {data.time.hora.slice(0, 5)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{
              fontSize: 20,
              fontWeight: '500',
              color: thema.color,
              marginBottom: 10
            }}>{data.soma?.toFixed(2).replace('.', ',')}</Text>
          </View>



          <FlatList
            horizontal
            ItemSeparatorComponent={<Text style={{ color: '#ccc' }}> + </Text>}
            data={data.parcelas}
            renderItem={({ item }) => {
              return <Text style={{ color: '#ccc' }}>{item}</Text>
            }}
          />
        </View>

      </TouchableOpacity>

    )
  }

  return (
    <View style={[styles.container, { backgroundColor: thema.backgroundColor }]}>

      <StatusBar barStyle={!dark ? 'dark-content' : 'light-content'} backgroundColor={thema.backgroundColor} />

      {/* ----------------- Monitor ------------------- */}


      <View style={styles.monitor}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <Text style={{ color: thema.color, paddingHorizontal: 20, marginTop: 20, marginBottom: 10 }}>HISTORICO</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: dark ? '#fff' : '#222', fontSize: 16, marginRight: 10 }}>{dark ? 'Escuro' : 'Claro'}</Text>
            <Switch
              trackColor={{ false: '#aaa', true: '#aaa' }}
              thumbColor={dark ? '#fff' : '#fff'}
              onValueChange={toggleSwitch}
              value={dark}
            />
          </View>
        </View>



        <FlatList

          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: 20 }}
          horizontal
          ref={(ref) => {
            listHistRef = ref;
          }}
          data={historico}
          renderItem={({ item, index }) => <Historico data={item} index={index} />}
          ItemSeparatorComponent={() => <View
            style={styles.separador}
          />}
        />



        <View style={styles.tec_topo}>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={(ref) => {
              listValRef = ref;
            }}
            data={parcelas}
            ItemSeparatorComponent={() => (<Text style={{ alignSelf: 'center', color: thema.color }}>+</Text>)}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.flat_historico_itens}>
                  <Text style={[styles.valor_historico_item, { color: thema.color }]}>{item}</Text>
                </TouchableOpacity>
              )

            }}
          />
          <Text style={[styles.digito, { color: thema.color }]}>{digito.length == 0 ? '0' : digito}</Text>


        </View>

      </View>


      {/* ----------------- Teclado ------------------- */}


      <View style={[styles.area_teclado, { backgroundColor: thema.backgroundColor }]}>


        <View style={[styles.teclado, { backgroundColor: thema.backgroundColor }]}>

          <View style={{ flex: 3 }}>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 7])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[[styles.txt_btn, { color: thema.color }], { color: thema.color }]}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 8])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 9])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>9</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 4])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 5])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 6])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>6</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 1])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 2])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>
                <Text style={[styles.txt_btn, { color: thema.color }]}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 3])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>3</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 0])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>0</Text>
              </TouchableOpacity>
<View style={styles.btn}/>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, '.'])}
                activeOpacity={.8}
                style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>,</Text>
              </TouchableOpacity>

            </View>

          </View>

          <View style={{ flex: 1, flexDirection: 'column' }}>

            <TouchableOpacity
              onPress={() => {
                setDigito([])
                setParcelas([])
                setUltimo('')
              }}
              activeOpacity={.8}
              style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff' }]}>

              <Text style={{ fontSize: 22, fontWeight: '500', color: thema.color }}>C</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={apagarDigito}
              activeOpacity={.8} style={styles.btn}>

              <FontAwesome name='long-arrow-left' size={20} color={thema.especial} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={montaParcelas}
              activeOpacity={.8} style={styles.btn}>

              <FontAwesome name='plus' size={20} color={thema.especial} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={Registrar}
              activeOpacity={.8}
              style={styles.btn}>

              <FontAwesome name='check' size={20} color={thema.especial} />
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  separador: {
    marginLeft: 15,
    marginRight: 15
  },
  monitor: { flex: 1, justifyContent: 'space-between', elevation: 4, zIndex: 9999 },

  tec_topo: {
    flexDirection: 'row',
  },
  flat_historico_itens: {
    borderRadius: 5, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20,
  },
  valor_historico_item: { fontSize: 18 },

  digito: {
    fontSize: 80,
    flexDirection: "row",
    alignSelf: 'flex-end',
    marginRight: 20,
    marginLeft:50
  },
  lineCalc: {
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  area_teclado: {
    paddingHorizontal: 15,
  },
  teclado: { flexDirection: 'row', marginBottom: 10 },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: width / 5,
    elevation: 1,
    margin: .5,


  },
  btn_especial: {
    fontSize: 25
  },
  txt_btn: {
    fontSize: 25,
    fontWeight: '600'
  }
})