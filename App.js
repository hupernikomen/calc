import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';

const width = Dimensions.get('window').width

import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function App() {



  const [digito, setDigito] = useState([])
  const [ultimo, setUltimo] = useState('')
  const [parcelas, setParcelas] = useState([]) // Todos os valores digitados para soma
  const [historico, setHistorico] = useState([])

  useEffect(() => {
    // Pega caractere digitado 
    // monta o numero
    // e envia para o ultimo numero montado
    setUltimo(digito.join(''))
    downButtonHandler()


  }, [digito])

  function montaParcelas() {
    if (ultimo != '') {

      setParcelas(parcelas => [...parcelas, parseFloat(ultimo).toFixed(2)])
      setUltimo("")
      setDigito([])
    }
  }

  let listViewRef;
  
  const downButtonHandler = () => {
    listViewRef.scrollToEnd({ animated: true });
  };

  function Registrar() {
    if (digito.length == 0 && parcelas.length == 0) {
      return
    }

    let dataAtual = new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });

    let soma = 0
    for (let i = 0; i < parcelas.length; i++) {
      soma += parseFloat(parcelas[i]);
    }

    setHistorico(historico => [...historico, {
      soma: parcelas.length > 0 ? soma : parseFloat(ultimo),
      dataAtual,
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
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
        onPress={() => { }}>

        <Text style={{ fontSize: 12, color: '#aaa', marginTop: 5 }}>{data.dataAtual}</Text>

        <View style={{ alignItems: 'flex-end' }}>

          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{
              marginLeft: 5,
              fontSize: 20,
              fontWeight: '600',
              color: '#222'

            }}>{data.soma?.toFixed(2).replace('.', ',')}</Text>
          </View>



          <FlatList
            horizontal
            ItemSeparatorComponent={<Text> + </Text>}
            data={data.parcelas}
            renderItem={({ item }) => {
              return <Text>{item}</Text>
            }}
          />
        </View>

      </TouchableOpacity>

    )
  }

  return (
    <View style={styles.container}>


      {/* ----------------- Monitor ------------------- */}


      <View style={styles.monitor}>


        <FlatList
          ref={(ref) => {
            listViewRef = ref;
          }}
          data={historico}
          renderItem={({ item, index }) => <Historico data={item} index={index} />}
          ItemSeparatorComponent={() => <View
            style={styles.separador}
          />}
        />

        <Text style={styles.digito}>{digito.length == 0 ? '0' : digito}</Text>

      </View>


      {/* ----------------- Teclado ------------------- */}


      <View style={styles.area_teclado}>
        <View style={styles.tec_topo}>

          <FlatList
            horizontal
            data={parcelas}
            ItemSeparatorComponent={() => (<Text>+</Text>)}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.flat_historico_itens}>
                  <Text style={styles.valor_historico_item}>{item}</Text>
                </TouchableOpacity>
              )

            }}
          />


        </View>

        <View style={styles.teclado}>

          <View style={{ flex: 3 }}>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 7])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 8])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 9])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>9</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 4])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 5])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 6])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>6</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 1])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 2])}
                activeOpacity={.8}
                style={styles.btn}>
                <Text style={styles.txt_btn}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 3])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>3</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => {
                  setDigito([])
                  setParcelas([])
                  setUltimo('')
                }}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={{ fontSize: 22, fontWeight: '500', color: '#222' }}>C</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 0])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, '.'])}
                activeOpacity={.8}
                style={styles.btn}>

                <Text style={styles.txt_btn}>,</Text>
              </TouchableOpacity>

            </View>

          </View>

          <View style={{ flex: 1, flexDirection: 'column' }}>

            <TouchableOpacity
              onPress={() => setDigito([])}
              activeOpacity={.8} style={[styles.btn, { flex: 1 }]}>

              <FontAwesome name='long-arrow-left' size={25} color='red' />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={montaParcelas}
              activeOpacity={.8} style={[styles.btn, { flex: 1 }]}>

              <FontAwesome name='plus' size={25} color='red' />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={Registrar}
              activeOpacity={.8}
              style={[styles.btn, { flex: 2, }]}>

              <FontAwesome name='check' size={25} color='red' />
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
    backgroundColor: '#fff'
  },
  monitor: { flex: 1 },

  tec_topo: {
    paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', alignItems: 'center',
  },
  flat_historico_itens: {
    backgroundColor:'blue',
    borderRadius: 5, flexDirection: 'row', alignItems: 'center', marginHorizontal: 5,
  },
  valor_historico_item: { paddingHorizontal: 5 },

  digito: {
    paddingHorizontal: 20,
    alignItems: "baseline",
    alignSelf: 'flex-end',
    flexDirection: 'row',
    fontSize: 60,
    fontWeight: '600',
    color: '#222'
  },
  lineCalc: {
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  area_teclado: {
    backgroundColor: '#fff',

    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  teclado: { flexDirection: 'row', backgroundColor: '#fff' },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: width / 5,
    margin: .5,
    borderRadius: 4

  },
  btn_especial: {
    color: 'red',
    fontSize: 25
  },
  txt_btn: {
    fontSize: 25,
    color: '#222',
    fontWeight: '600'
  }
})