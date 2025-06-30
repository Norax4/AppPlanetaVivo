import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	ScrollView,
	Image,
	Modal,
	Button,
	Alert
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../database/authContext';
import * as Progress from 'react-native-progress';
import { CustomButton } from '../../components/CustomButton';
import {
	fetchAllChallenges,
	fetchAllChallInputs,
} from '../../database/fetchFunctions';
import { Reto } from '../../components/Reto';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserPanel({ navigation }) {
	const { user } = useContext(AuthContext);
	const puntos = user.points;
	const nivel = Math.floor(puntos / 100) + 1;
	const [listState, setListState] = useState('creado');
	const [createdChallenges, setCreatedChall] = useState([]);
	const [partakenChallenges, setPartakenChall] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [challenge, setChallenge] = useState(null);

	useEffect(() => {
		const fetch = async () => {
			const data1 = await fetchAllChallenges();
			const dataChall = data1.filter(
				(chal) => chal.usuario.email === user.email
			);
			setCreatedChall(dataChall);

			const data2 = await fetchAllChallInputs();
			const participatedNames = new Set(
				data2.map((input) => input.reto.nombre)
			);
			const partChall = data1.filter((chal) =>
				participatedNames.has(chal.nombreReto)
			);
			setPartakenChall(partChall);
		};
		fetch();
	}, []);

	//Cambiar de lista
	const changeList = () => {
		if (listState === 'creado') {
			setListState('participado');
		} else {
			setListState('creado');
		}
	};

	const fullDelete = async (object) => {
		setModalVisible(false);
		try {
			const keys = await AsyncStorage.getAllKeys();
			const key = keys.find(k => k.indexOf(object.nombreReto) !== -1);

			await AsyncStorage.removeItem(key);

			Alert.alert('Éxito', 'Item eliminado correctamente');
		} catch (error) {
			console.error('Error eliminando item:', error);
			Alert.alert('Error', 'No se pudo eliminar el item');
		}
	};

	//Items de las listas
	const Item = ({ object }) => {
		return (
			<View 
				key={object.nombreReto} 
				style={{
					padding: 3,
					marginVertical: 10,
					paddingHorizontal: 10,
					borderRadius: 3,
					backgroundColor: '#085f63'
				}}
			>

				<Text 
					style={{fontSize: 20,
					fontWeight: 700,
					color: '#fff',
					marginVertical: 5}}
				>
					{object.nombreReto}
				</Text>
				<Text 
					style={{fontSize: 15,
					fontWeight: 700,
					color: '#fff',
					marginVertical: 5}}
				>
					{object.descripcion}
				</Text>
				
				{listState === 'creado' ? (
					<View style={{marginBottom: 10}}>
						<CustomButton
							onPress={() =>
								navigation.navigate('RegisterChallenge', {
									challenge: object,
								})
							}
							btnText='Editar reto'
							btnBgColor='#6892d5'
						/>
						<CustomButton
							onPress={() =>
								{setModalVisible(true); 
								setChallenge(object)}
							}
							btnText='Eliminar reto'
							btnBgColor='#cc3820'
						/>
					</View>
				) : (
					<View style={{marginBottom: 10}}>
						<CustomButton
							onPress={() =>
								navigation.navigate('SelectedChallenge', {
									challenge: object,
								})
							}
							btnText='Ver participación'
							btnBgColor='#6892d5'
						/>
					</View>
				)}
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				<FlatList
					style={{ marginBottom: 100 }}
					contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
					data={listState === 'creado' ? createdChallenges : partakenChallenges}
					renderItem={({ item }) => <Item object={item} />}
					keyExtractor={(item) => item.nombreReto}
					ListHeaderComponent={
						<>
						<Image source={{ uri: user.imagenUser }} style={styles.image} />
						<Text style={styles.nameText}>{user.nombreUser}</Text>
						<Text style={styles.nivelText}>Nivel {nivel}</Text>
						<Progress.Bar
							progress={(puntos % 100) / 100}
							width={305}
							style={{ marginBottom: 10, marginHorizontal: 30 }}
						/>

						<View
							style={{
							height: 2,
							width: '100%',
							backgroundColor: '#000000',
							marginVertical: 10,
							}}
						/>

						<CustomButton
							btnBgColor="#6892d5"
							btnText={
							listState === 'creado'
								? 'Ver participaciones'
								: 'Ver retos creados'
							}
							onPress={changeList}
						/>
						</>
					}
					/>

				<Modal
					visible={modalVisible}
					animationType='slide'
					transparent={true}
				>
					<View
					style={{
						flex: 1,
						backgroundColor: 'rgba(0,0,0,0.5)',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					>
						<View
						style={{
							backgroundColor: 'white',
							padding: 20,
							borderRadius: 10,
							width: '90%',
						}}
						>
							<Text style={{fontSize: 30, margin: 10}}>
								¡Cuidado!
							</Text>
							<Text style={{fontSize: 30, margin: 10, textAlign: 'center'}}>
								¿Esta seguro de querer eliminar este reto?
							</Text>

							<Button
							title='Eliminar'
							color="#cc3820"
							onPress={() => fullDelete(challenge)}
							/>
							<Button
								title='Cancelar'
								onPress={() => setModalVisible(false)}
								color='gray'
							/>
						</View>
					</View>
				</Modal>
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
		flexGrow: 1
	},
	nameText: {
		margin: 10,
		fontSize: 30,
		textAlign: 'center',
	},
	nivelText: {
		margin: 10,
		fontSize: 20,
		textAlign: 'center',
	},
	propText: {
		margin: 10,
		fontSize: 15,
		textAlign: 'center',
	},
	itemView: {
		backgroundColor: '#f4fffb',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 60,
		alignSelf: 'center',
		marginBottom: 5,
		marginTop: 30,
		borderColor: '#f4fffb',
		borderWidth: 3
	}
});
