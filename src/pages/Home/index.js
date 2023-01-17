import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, StatusBar, Switch, TextInput, ScrollView } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width
var listValRef;
var listHistRef;

export default function Home() {

  const navigation = useNavigation()

  const [digito, setDigito] = useState([])
  const [ultimo, setUltimo] = useState('')
  const [parcelas, setParcelas] = useState([]) // Todos os valores digitados para soma
  const [historico, setHistorico] = useState([])

  const [dark, setDark] = useState(false)
  const [thema, setThema] = useState({})
  const toggleSwitch = () => setDark(previousState => !previousState);
  const [soma, setSoma] = useState(0)

  useEffect(() => {
    if (dark) {
      setThema({
        backgroundColor: "#222",
        color: '#fff',
        especial: '#FF8C00'
      })
    } else {
      setThema({
        backgroundColor: "#fff",
        color: '#222',
        especial: '#FF6347'
      })
    }
  }, [dark])

  useEffect(() => {
    downButtonHandler()
    setUltimo(digito.join(''))
    
    let s = 0
    for (let i = 0; i < parcelas.length; i++) {
      s += parseFloat(parcelas[i]);
      setSoma(s)
    }

  })

  useEffect(() =>{
    navigation.setOptions({
      title: 'Calculadora Caixa'
    })
  },[])


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
    var soma = 0


    if (digito.length == 0 && parcelas.length == 0) return

    let time = {
      data: new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      hora: new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })
    }

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

  function Historico({ data }) {
    return (
      !soma &&
      <View
        onPress={() => { }}>



        <View style={{ width: width / 4, alignItems: 'center' }}>

          <Text style={{ fontSize: 14, color: '#ccc', marginTop: 5 }}>
            {data.time.hora.slice(0, 5)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{
              fontSize: 20,
              fontWeight: '500',
              color: thema.color,
              marginBottom: 10
            }}>{data.soma?.toFixed(2).replace('.', ',')}</Text>
          </View>



          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.parcelas}
            renderItem={({ item }) => {
              return <Text style={{ color: '#ccc' }}>{item}</Text>
            }}
          />
        </View>

      </View>

    )
  }

  return (
    <View style={[styles.container, { backgroundColor: thema.backgroundColor }]}>

      <StatusBar barStyle={!dark ? 'dark-content' : 'light-content'} backgroundColor={thema.backgroundColor} />

      {/* ----------------- Monitor ------------------- */}


      <View style={styles.monitor}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



          <Text style={{ color: thema.color,  marginTop: 20, marginBottom: 10 }}>HISTORICO</Text>



          {/* Swite */}


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

        {/* Historico */}

        <FlatList
          showsHorizontalScrollIndicator={false}
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



        <View style={styles.input_value}>


          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{alignSelf:'flex-end',marginBottom:15}}
            ref={(ref) => {
              listValRef = ref;
            }}
            data={parcelas}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.flat_historico_itens}>
                  <Text style={[styles.valor_historico_item, { color: thema.color }]}>{item}</Text>
                </TouchableOpacity>
              )

            }}
            ListFooterComponent={() => (
                <TextInput
                  style={[styles.resultado, { color: thema.color,borderTopWidth:1,borderTopColor:'#777' }]}
                  editable={false}
                  maxLength={5}
                  value={soma.toFixed(2).toString()} />
              )
            }
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>



            <TextInput
              style={[styles.digito, { color: thema.color,alignSelf:'flex-end' }]}
              editable={false}
              maxLength={5}
              value={digito.length == 0 ? '0' : digito.join('').toString()} />
          </View>

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
              <View style={styles.btn} />

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
              onPress={() => { }}
              activeOpacity={.8} style={styles.btn}>

              <FontAwesome name='long-arrow-left' size={20} color={thema.especial} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {

                montaParcelas()
              }
              }
              activeOpacity={.8} style={styles.btn}>

              <FontAwesome name='plus' size={20} color={thema.especial} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Registrar()
                setSoma(0)
              }}
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
    monitor: { flex: 1, justifyContent: 'space-between', zIndex: 9999, paddingHorizontal:20 },
    resultado: { alignSelf: 'flex-start', fontSize: 22, fontWeight: '700' },
    input_value: {
      
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    valor_historico_item: { fontSize: 18,marginBottom:15},
  
    digito: {
      fontSize: 80,
      flexDirection: "row",
    },
    lineCalc: {
      flexDirection: "row",
      justifyContent: 'space-around',
    },
    teclado: { flexDirection: 'row' },
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