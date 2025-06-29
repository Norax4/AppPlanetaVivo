import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, Alert } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../database/authContext';
import * as Progress from 'react-native-progress';
import { Button } from '../../components/Button';
import { fetchAllChallenges, fetchAllChallInputs } from '../../database/fetchFunctions';

export function UserPanel({navigation}) {
	const { user } = useContext(AuthContext);
	const puntos = user.points;
	const nivel = (puntos ? Math.floor(puntos / 100) : 1);
	const [listState, setListState] = useState('creado'); 
	const [createdChallenges, setCreatedChall] = useState([]);
	const [partakenChallenges, setPartakenChall] = useState([]);

	useEffect(() => {
		const fetch = async() => {
			const data1 = await fetchAllChallenges();
			const dataChall = data1.filter(chal => chal.usuario.email === user.email);
			setCreatedChall(dataChall);

			const data2 = await fetchAllChallInputs();
			const participatedNames = new Set(data2.map(input => input.reto.nombre));
			const partChall = data1.filter(chal => participatedNames.has(chal.nombreReto));
      		setPartakenChall(partChall);
		}
		fetch();
	}, []);

	//Cambiar de lista
	const changeList = () => {
		if (listState === 'creado') {
			setListState('participado');
		} else {
			setListState('creado');
		}
	}

	//Items de las listas
	const Item = ({object}) => {
		
		return (
			<View key={object.nombreReto} style={styles.itemView} >
				<Text>{object.nombreReto}</Text>
				{listState === 'creado' ? (
					<Button 
						onPress={() => 
							navigation.navigate('RegisterChallenge', {challenge: object})
						}
						btnText='Editar reto'
						btnBgColor = '#6892d5'
					/>
				) : (
					<Button 
						onPress={() => 
							navigation.navigate('SelectedChallenge', {challenge: object})
						}
						btnText='Ver reto' 
						btnBgColor = '#6892d5'
					/>
				)}
			</View>
		)}

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				<ScrollView style={styles.scrollView}>
				
				{/* usar <Image /> para la imagen aqui */}
				<Text style={styles.nameText}>{user.nombreUser}</Text>
				<Text style={styles.nivelText}>Nivel {nivel}</Text>
				<Text style={styles.propText}>Puntos: {puntos}</Text>
				<Progress.Bar progress={1} /*placeholder */ width={345}/>
				{/*Agregar un gráfico de retos por semana y mes con Victory Native oRecharts
				Agregar retos completados por el usuario*/}
				{/* Poner boton de logout aqui? */}

				<View style={{height: 2, width: '100%', backgroundColor: '#000000', marginVertical: 10}}/>
				
					<Button 
						btnBgColor='#6892d5'
						btnText={listState === 'creado' ? 
						'Ver retos creados' : 'Ver participaciones'}
						onPress={() => changeList()}
					/>
				</ScrollView>
				{listState === 'creado' ? (
					<FlatList 
						contentContainerStyle={{paddingHorizontal: 20}}
						data = {createdChallenges}
						renderItem={({item}) => <Item object = {item} />}
						keyExtractor={item => item.nombreReto}
					/>
				) : (
					<FlatList 
						contentContainerStyle={{paddingHorizontal: 20}}
						data = {partakenChallenges}
						renderItem={({item}) => <Item object = {item} />}
						keyExtractor={item => item.nombreReto}
					/>
				)}

				{/*<ScrollView style={styles.scrollView}>
					<Button 
						btnText="Eliminar cuenta"
						btnBgColor='#ff8c94'
						onPress={deleteAccount()}
					/>
				</ScrollView>*/}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
	},
	view: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#c9fdd7',
	},
	scrollView: {
		marginHorizontal: 30,
	},
	nameText: {
		margin: 10,
		fontSize: 30,
		textAlign: 'center'
	},
	nivelText: {
		margin: 10,
		fontSize: 20,
		textAlign: 'center',
	},
	propText: {
		margin: 10,
		fontSize: 15,
		textAlign: 'center'
	},
	/*error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},*/
    itemView: {
      	backgroundColor: '#f4fffb',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});
