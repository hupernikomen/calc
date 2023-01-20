import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function Historico() {
	const [historico, setHistorico] = useState([]); // Initial empty array of users
	
	const data = new Date()
	
	useEffect(() => {
		async function Add() {
			await firestore()
				.collection('caixa')
				.where('time.data.dia', "==", data.getDate())
				.get()
				.then(querySnapshot => {
					const data = []
					
					querySnapshot.forEach(documentSnapshot => {
						data.push({
							...documentSnapshot.data(),
							key: documentSnapshot.id
						})
					});

					setHistorico(data)
				});
			}

		Add()

	}, []);


	function Dados({ data }) {

		// {"key": "jioD3fNLdMNirFsqpM7C", "parcelas": ["8.00", "6.00"], "soma": 14, "time": {"data": {"ano": 2023, "dia": 19, "mes": 1}, "hora": "18:53:12"}} item
		return (
			<View style={{ padding: 15, margin: 4, borderRadius: 4, backgroundColor: '#fff' }}>
				<View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

					<Text style={{ color: '#222' }}>Data: {data.time?.data?.dia}/{data.time?.data?.mes}</Text>
					<Text style={{ color: '#222' }}>{data.time?.hora}</Text>
				</View>
				{/* <ScrollView key={index} horizontal>
					<Text>{parcela}</Text>
				</ScrollView> */}
				<View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

					<Text style={{ marginTop: 10, color: '#222' }}>Total da Venda: R$</Text>
					<Text style={{ marginTop: 10, color: '#222', fontWeight: 'bold', fontSize: 16 }}>{data.soma.toFixed(2)}</Text>
				</View>
			</View>
		)
	}

	return (
		<View style={{ flex: 1 }}>

			<FlatList
				data={historico}
				renderItem={({ item }) =>
					<Dados data={item} />
				}
			/>


		</View>
	);
}