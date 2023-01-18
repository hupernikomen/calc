import React, {useState} from 'react';
import { View,Text,FlatList } from 'react-native';

export default function Historico() {

  const [historico, setHistorico] = useState([])


var listHistRef;


const downButtonHandler = () => {
    listHistRef.scrollToEnd({ animated: true });
  };

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
        <View>

            
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

        </View>
    );
}