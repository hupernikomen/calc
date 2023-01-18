import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, StatusBar, Switch, TextInput, ScrollView } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import firebase from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width
var listValRef;

export default function Home() {

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
        backgroundColor: "#222",
        monitor: '#33333350',
        color: '#fff',
        especial: '#FF8C00'
      })
    } else {
      setThema({
        backgroundColor: "#fff",
        monitor: '#f1f1f150',
        color: '#222',
        especial: '#FF6347'
      })
    }
  }, [dark])

  useEffect(() => {
    downButtonHandler()
    setUltimo(digito.join(''))


    navigation.setOptions({
      title: 'Calculadora Caixa',
      headerTintColor: thema.color,
      headerStyle: {
        backgroundColor: thema.backgroundColor
      },
      headerRight: () =>
        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity
            onPress={() => setDark(!dark)}
            style={{ marginRight: 20 }}
          >
            <MaterialIcons name={dark ? 'lightbulb-outline' : 'lightbulb'} size={22} color={thema.color} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Historico')}
          >
            <Feather name='align-right' size={22} color={thema.color} />
          </TouchableOpacity>
        </View>


    })
  })

  useEffect(() => {

    let s = 0
    for (let i = 0; i < parcelas.length; i++) {
      s += parseFloat(parcelas[i]);
    }
    setSoma(s)

  }, [parcelas])

  function deleteParcela(i) {
    const newParcelas = parcelas.filter((item, index) => index != i)

    setParcelas(newParcelas);

  }


  function incluirValor() {

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

    let time = {
      data: new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      hora: new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })
    }

    for (let i = 0; i < parcelas.length; i++) {
      soma += parseFloat(parcelas[i]);
    }

    await firebase().collection('caixa').add(
      {
        soma: parcelas.length > 0 ? soma : parseFloat(ultimo),
        time,
        parcelas
      }
    )



    setParcelas([])
    setUltimo('')
    setDigito([])

  }


  return (
    <View style={[styles.container, { backgroundColor: thema.backgroundColor }]}>

      <StatusBar barStyle={!dark ? 'dark-content' : 'light-content'} backgroundColor={thema.backgroundColor} />

      {/* ----------------- Monitor ------------------- */}

      <View style={[styles.monitor, { backgroundColor: thema.monitor }]}>


        <View style={{ width: 100, alignItems: 'flex-end', flexDirection: 'row' }}>

          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 15 }}
            ref={(ref) => {
              listValRef = ref;
            }}
            data={parcelas}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                  <Text style={[styles.valor_historico_item, { color: thema.color }]}>{item}</Text>
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => deleteParcela(index)}
                  >
                    <Feather name='trash-2' color={thema.especial} size={20} />
                  </TouchableOpacity>
                </View>
              )
            }}
            ListFooterComponent={() => (
              <TextInput
                style={[styles.digito, { color: thema.color }]}
                editable={false}
                maxLength={5}
                value={digito.length == 0 ? '0.00' : digito.join('').toString()} />
            )}
          />
        </View>

        <TextInput
          style={[styles.resultado, { color: thema.color }]}
          editable={false}
          maxLength={6}
          value={soma.toFixed(2).toString()} />

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
              style={[styles.btn, { backgroundColor: dark ? '#222' : '#fff', flex: 1 }]}>

              <Text style={{ fontSize: 22, fontWeight: '500', color: thema.color }}>C</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={incluirValor}
              activeOpacity={.8} style={[styles.btn, { flex: 1 }]}>

              <FontAwesome name='plus' size={20} color={thema.especial} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={Registrar}
              activeOpacity={.8}
              style={[styles.btn, { flex: 2 }]}>

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
  monitor: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resultado: {
    alignSelf: 'flex-end',
    fontSize: 60,
    fontWeight: '700'
  },
  input_value: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  valor_historico_item: {
    fontSize: 18
  },

  digito: {
    fontSize: 30,
    flexDirection: "row",
  },
  lineCalc: {
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  teclado: {
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: width / 5,
    elevation: 1,
    margin: 1,
  },
  btn_especial: {
    fontSize: 25
  },
  txt_btn: {
    fontSize: 25,
    fontWeight: '600'
  }
})