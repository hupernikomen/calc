import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, StatusBar, TextInput } from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width

export default function Home() {
  var listValRef;

  const navigation = useNavigation()

  const [digito, setDigito] = useState([])
  const [ultimo, setUltimo] = useState(0)
  const [parcelas, setParcelas] = useState([])

  const [dark, setDark] = useState(false)
  const [thema, setThema] = useState({})
  const [soma, setSoma] = useState(0)

  useEffect(() => {
    if (dark) {
      setThema({
        backgroundColor: "#fff",
        monitor: '#f1f1f180',
        color: '#222',

      })
    } else {
      setThema({
        backgroundColor: "#333",
        monitor: '#44444450',
        color: '#fff',
      })
    }
  }, [dark])

  useEffect(() => {
    downButtonHandler()
    setUltimo(digito.join(''))

    let valor = 0
    for (let i = 0; i < parcelas.length; i++) {
      valor += parseFloat(parcelas[i]);
    }
    setSoma(valor)
  }, [digito])


  function deleteParcela(i) {
    const newParcelas = parcelas.filter((item, index) => index != i)
    setParcelas(newParcelas);
  }


  function incluirValor() {
    if (!ultimo) return

    setParcelas(parcelas => [...parcelas, parseFloat(ultimo).toFixed(2)])

    setUltimo("")
    setDigito([])
  }

  const downButtonHandler = () => {
    listValRef.scrollToEnd({ animated: true });
  };

  async function Registrar() {
    var soma = 0

    if (digito.length == 0 && parcelas.length == 0) return
    const data = new Date()
    let time = {
      data: {
        dia: data.getDate(),
        mes: data.getMonth() + 1,
        ano: data.getFullYear(),
      },
      hora: new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })
    }

    for (let i = 0; i < parcelas.length; i++) {
      soma += parseFloat(parcelas[i]);
    }

    await firestore()
      .collection('caixa')
      .add(
        {
          soma: parcelas.length > 0 ? soma : parseFloat(ultimo),
          time,
          parcelas
        }
      )
      .then(() => {
        setParcelas([])
        setUltimo('')
        setDigito([])

      })
      .catch((err) => {
        console.log(err);
      })


  }


  return (
    <View style={[styles.container, { backgroundColor: thema.backgroundColor }]}>

      <StatusBar barStyle={!dark ? 'dark-content' : 'light-content'} backgroundColor={thema.backgroundColor} />

      {/* ----------------- Monitor ------------------- */}

      <View style={[styles.monitor, { backgroundColor: thema.monitor }]}>


          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={(ref) => {
              listValRef = ref;
            }}
            data={parcelas}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: "center", width:width/4 }}
                  onPress={() => deleteParcela(index)}>

                  <Text style={[styles.valor_historico_item, { color: thema.color }]}>{item}</Text>
                  <Feather name='trash-2' color={'#FE0F3C'} size={20} />
                </TouchableOpacity>
              )
            }}
          />

          <View style={{alignItems:"flex-end", paddingHorizontal:20}}>

            <TextInput
              style={[styles.digito, { color: thema.color, padding: 0 }]}
              editable={false}
              maxLength={5}
              value={digito.length == 0 ? '' : digito.join('').toString()} />


            <TextInput
              style={[styles.resultado, { color: thema.color }]}
              editable={false}
              maxLength={6}
              value={soma.toFixed(2).toString()} />
          </View>


      </View>


      {/* ----------------- Teclado ------------------- */}

      <View>
        <View style={[styles.lineBtnsSup, { backgroundColor: thema.monitor, borderTopWidth: 5, borderTopColor: thema.backgroundColor }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Historico')}
            activeOpacity={.8}
            style={{ padding: 15 }}>

            <Text style={{ color: thema.color }}>HISTÓRICO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDigito([])
              setParcelas([])
              setUltimo('')
            }}
            activeOpacity={.8}
            style={{ padding: 15 }}>
            <Text style={{ color: thema.color }}>LIMPAR</Text>

          </TouchableOpacity>

        </View>
      </View>
      <View style={[styles.area_teclado, { backgroundColor: thema.backgroundColor }]}>


        <View style={[styles.teclado, { backgroundColor: thema.backgroundColor }]}>


          <View style={{ flex: 3, }}>
            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 7])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[[styles.txt_btn, { color: thema.color }], { color: thema.color }]}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 8])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 9])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>9</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 4])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 5])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 6])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>6</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 1])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 2])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>
                <Text style={[styles.txt_btn, { color: thema.color }]}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 3])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, 0])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>0</Text>
              </TouchableOpacity>

              {/* Vazio */}
              <View style={styles.btn} />

              <TouchableOpacity
                onPress={() => setDigito(digito => [...digito, '.'])}
                activeOpacity={.8}
                style={[styles.btn,         { 
                  backgroundColor: thema.backgroundColor,
                  margin: .5,
                  borderWidth:.5,
                  borderColor:thema.monitor
                  }]}>

                <Text style={[styles.txt_btn, { color: thema.color }]}>,</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: thema.monitor }}>



            <TouchableOpacity
              onPress={incluirValor}
              activeOpacity={.8} style={[styles.btn, { flex: 1 }]}>

              <Feather name='plus' size={28} color={thema.color} />
            </TouchableOpacity>


            <TouchableOpacity
              onPress={Registrar}
              activeOpacity={.8}
              style={[styles.btn, { flex: 3, backgroundColor: "green" }]}>

              <Feather name='save' size={28} color={thema.color} />
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
  monitor: {
    flex: 1,
    alignItems: 'flex-end'
  },
  resultado: {
    fontSize: 60,
    fontWeight: '500',
    alignSelf: "flex-end",
  },
  input_value: {
    flex: 1,
    justifyContent: 'space-between'
  },
  valor_historico_item: {
    fontSize: 18
  },

  digito: {
    fontSize: 18,
  },

  lineBtnsSup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 5
  },
  lineCalc: {
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  teclado: {
    flexDirection: 'row',
    elevation: 10
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: width / 3.5,

  },
  btn_especial: {
    fontSize: 25
  },
  txt_btn: {
    fontSize: 25,
    fontWeight: '600'
  }
})