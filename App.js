import React, { useState,useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width

export default function App() {

  const [historico, setHistorico] = useState([])

  const [registro, setRegistro] = useState('')

  const [parcela, setParcela] = useState('')
  

  function InserirValor(valor) {

    // if(valor == '+' || valor == '.' ) {
    //   return
    // }

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
    var dataAtual = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    
    registro && setHistorico(historico => [...historico, { registro: registro, dataAtual }])
    Limpar()
  }

  function ExcluirItem(index) {
    let i = historico.splice(index,1)
    console.log(i);
  }

  function Historico({ data,index }) {
    
    

    return (
      <TouchableOpacity
        onPress={()=> ExcluirItem(index)}
      >

        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-end' }}>


          <Text style={{ marginRight: 10, color:'#aaa' }}>R$</Text>

          <Text style={{
            
            fontSize: 35,
            fontWeight: '800',
            color:'#333'
            
          }}>{data.registro.toFixed(2).replace('.', ',')}</Text>
        </View>

        <Text style={{fontSize:12, alignSelf: 'flex-end',color:'#aaa' }}>{data.dataAtual}</Text>
      </TouchableOpacity>

)
}

const Separador = () => {
  return (
    <View
    style={{
      height: 1,
      width: "100%",
      backgroundColor: "#ccc",
      marginVertical:10
    }}
    />
    );
  }
  
  return (
    <View style={styles.container}>

      <FlatList
        style={{
          flex: 1, paddingHorizontal: 20,
          marginVertical: 15,
        }}
        ItemSeparatorComponent={Separador}
        data={historico}
        renderItem={({ item,index }) => <Historico data={item} index={index} />}
      />

      {parcela != '' ?
        <View style={styles.calculo}>

          <Text>
            <Text>Calculo : </Text>
            <Text style={{color:'#222'}}>{parcela}</Text>
          </Text>

          <Text>
            <Text>Subtotal : R$ </Text>
            <Text>{parseFloat(registro).toFixed(2).replace('.', ',')}</Text>
          </Text>
        </View>
        :
        <View style={styles.calculo}>
          <Text>R$ 0,00</Text>
          <Text>R$ 0,00</Text>
        </View>
      }

      <View style={styles.teclado}>

        <View style={{ flexDirection: 'row',backgroundColor:'#fff',padding:8 }}>

          <View style={{ flex: 3 }}>

            <View style={styles.lineCalc}>
              <TouchableOpacity onPress={() => InserirValor(7)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor(8)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor(9)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>9</Text>
              </TouchableOpacity>

            </View>



            <View style={styles.lineCalc}>
              <TouchableOpacity onPress={() => InserirValor(4)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor(5)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor(6)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>6</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity onPress={() => InserirValor(1)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor(2)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor(3)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>3</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.lineCalc}>
              <TouchableOpacity onPress={Limpar} activeOpacity={.8} style={styles.btn}>
                <Text style={{fontSize:22,fontWeight:'500',color:'#222'}}>C</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor(0)} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => InserirValor('.')} activeOpacity={.8} style={styles.btn}>
                <Text style={styles.txt_btn}>.</Text>
              </TouchableOpacity>

            </View>


          </View>

          <View style={{ flex: 1, flexDirection: 'column' }}>


            <TouchableOpacity onPress={() => InserirValor('+')} activeOpacity={.8} style={[styles.btn, { flex: 1 }]}>
              <Text style={styles.txt_btn}>+</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              Registrar()
            }} activeOpacity={.8} style={[styles.btn, { flex: 1,backgroundColor:'green' }]}>
              <Text style={{color:'#fff',fontSize:18}}>Enter</Text>
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
    backgroundColor:'#f1f1f1'
  },
  calculo: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  lineCalc: {
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  teclado: {
    backgroundColor:'#fff',
    elevation:20
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: width / 5,
    elevation: 3,
    margin: 1,
    borderRadius: 4

  },
  txt_btn: {
    fontSize: 35,
    color: '#222',
    fontWeight: '700'
  }
})