import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width

export default function App() {

  const [historico, setHistorico] = useState([])

  const [registro, setRegistro] = useState('')

  const [parcela, setParcela] = useState('')

  function InserirValor(valor) {

    const soma = parcela + valor
    setParcela(soma)

    let arrParcelas = parcela.split('+').length > 1 && parcela.split('+')

    var ultimo = arrParcelas[arrParcelas.length - 1];
    if (ultimo == '' && valor === '.') {
      return
    }

    if (valor == '+' && arrParcelas) {
      let soma = 0;
      for (var x = 0; x < arrParcelas.length; x++) {
        soma += Number(arrParcelas[x]);
      }
      setParcela(soma + valor)


    }
    valor != '+' && setRegistro(eval(parcela + valor))

  }


  function Limpar() {
    setParcela('')
    setRegistro('')
  }


  function Registrar() {
    console.log(registro);
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={historico}
        renderItem={({ item }) => console.log('item', item)}
      />

      <View style={styles.calculo}>

        <Text>
          <Text>Calculo : </Text>
          <Text>{parcela}</Text>
        </Text>

        <Text>
          <Text>Subtotal : R$ </Text><Text>{parseFloat(registro).toFixed(2)}</Text>
        </Text>
      </View>

      <View style={styles.teclado}>

        <View>
          <View style={styles.lineCalc}>
            <TouchableOpacity onPress={Limpar} activeOpacity={.8} style={[styles.btn, { height: 50 }]}>
              <Text style={styles.txt_btn_top}>Limpar</Text>
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={.8} style={[styles.btn, { height: 50 }]}>
              <Text style={styles.txt_btn_top}>Editar</Text>
            </TouchableOpacity>

          </View>

        </View>

        <View style={{ flexDirection: 'row' }}>

          <View style={{ flex: 3 }}>

            <View style={styles.lineCalc}>
              <TouchableOpacity onPress={() => InserirValor('7')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor('8')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor('9')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>9</Text>
              </TouchableOpacity>

            </View>



            <View style={styles.lineCalc}>
              <TouchableOpacity onPress={() => InserirValor('4')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor('5')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor('6')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>6</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity onPress={() => InserirValor('1')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor('2')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor('3')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>3</Text>
              </TouchableOpacity>

            </View>


          </View>

          <View style={{ flex: 1, flexDirection: 'column' }}>


            <TouchableOpacity onPress={() => InserirValor('+')} activeOpacity={.8} style={[styles.btn, { flex: 1 }]}>
              <Text style={styles.txt_btn}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => InserirValor('.')} activeOpacity={.8} style={[styles.btn, { flex: 1 }]}>
              <Text style={styles.txt_btn}>.</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              Registrar()
            }} activeOpacity={.8} style={[styles.btn, { flex: 2 }]}>
              <Text>Enter</Text>
            </TouchableOpacity>



          </View>

        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  calculo: {
    flexDirection:"row",
    justifyContent:'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  lineCalc: {
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  teclado: {
    margin: 4
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: width / 4,
    elevation: 3,
    margin: 1,
    borderRadius: 4
  },
  txt_btn: {
    fontSize: 35,
    color: '#333',
    fontWeight: '800'
  }
})