import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	FlatList,
	Modal,
	Button,
	Alert,
} from 'react-native';
import * as Location from 'expo-location';

import { InputTextArea } from '../../components/InputTextArea';
import { Reto } from '../../components/Reto';
import { useEffect, useState } from 'react';
import { fetchAllChallenges } from '../../database/fetchFunctions';

export function ChallengesList({ navigation }) {
	const [challenges, setChallenges] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [retoSeleccionado, setRetoSeleccionado] = useState(null);
	const [comentario, setComentario] = useState('');
	const [ubicacion, setUbicacion] = useState(null);

	const openModal = (reto) => {
		setRetoSeleccionado(reto);
		setModalVisible(true);
	};

	const confirmarParticipar = async () => {
		try {
			const { status } =
				await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert(
					'Permiso denegado',
					'Se necesita permiso para acceder a la ubicación'
				);
				return;
			}

			const loc = await Location.getCurrentPositionAsync({});
			setUbicacion(loc.coords);
			// Para guardar luego en AsyncStorage:
			console.log('Comentario:', comentario);
			console.log('Ubicación:', loc.coords);
			console.log('Reto:', retoSeleccionado);

			Alert.alert(
				'Registrado exitosamente',
				`Comentario: ${comentario}\nUbicación: ${loc.coords.latitude.toFixed(
					4
				)}, ${loc.coords.longitude.toFixed(4)}`
			);
		} catch (err) {
			console.error('Error al obtener ubicación', err);
			Alert.alert('Error', 'No se pudo obtener la ubicación');
		} finally {
			setModalVisible(false);
			setComentario('');
			setUbicacion(null);
		}
	};

	useEffect(() => {
        const fetch = async () => {
            const data = await fetchAllChallenges();
            setChallenges(data);
        }
        fetch();
	}, []);

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				{challenges.length > 0 ? (
					<FlatList
						style={{ marginBottom: 100 }}
						contentContainerStyle={{ paddingHorizontal: 20 }}
						data={challenges}
						renderItem={({ item, index }) => (
							<View key={index}>
								<Reto
									nombreReto={item.nombreReto}
									categoriaReto={item.categoriaReto}
									fechaLimiteReto={new Date(
										item.fechaLimite
									).toLocaleDateString('es-UY')}
									puntajeReto={item.puntaje}
									descripcionReto={item.descripcion}
									onPress={() => openModal(item)}
								/>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<ScrollView style={styles.scrollView}>
						<Text style={styles.text}>
							No hay disponibles retos actualmente.
						</Text>
					</ScrollView>
				)}
			</View>

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
						<Text style={{ fontSize: 18, marginBottom: 10 }}>
							Comentario para: {retoSeleccionado?.nombreReto}
						</Text>

						<View
							style={{
								borderWidth: 1,
								borderColor: '#ccc',
								borderRadius: 3,
								marginBottom: 10,
							}}
						>
							<InputTextArea
								placeholder='Escribe un comentario'
								value={comentario}
								onChangeText={setComentario}
								numberOfLines={4}
							/>
						</View>

						{/* Intente usar touchable opacity y no logre que se viera bien */}
						<Button
							title='Confirmar participación'
							onPress={confirmarParticipar}
						/>
						<Button
							title='Cancelar'
							onPress={() => setModalVisible(false)}
							color='gray'
						/>
					</View>
				</View>
			</Modal>
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
		marginHorizontal: 10,
		marginBottom: 100,
	},
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
	text: {
		marginTop: 30,
		fontSize: 18,
		backgroundColor: '#fff',
		padding: 3,
		paddingHorizontal: 10,
		borderRadius: 3,
	},
});
