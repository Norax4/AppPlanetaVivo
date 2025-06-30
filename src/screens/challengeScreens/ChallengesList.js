import * as Location from 'expo-location';
import { useContext } from 'react';
import {
	Alert,
	Button,
	FlatList,
	Modal,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Controller, useForm } from 'react-hook-form';

import { pickFromGallery, takePhoto } from '../../database/asyncPermissions';
import { useEffect, useState } from 'react';
import { InputTextArea } from '../../components/InputTextArea';
import { Reto } from '../../components/Reto';
import { AuthContext } from '../../database/authContext';
import { fetchAllChallenges } from '../../database/fetchFunctions';

export function ChallengesList({ navigation }) {
	const { user } = useContext(AuthContext);

	const [challenges, setChallenges] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [retoSeleccionado, setRetoSeleccionado] = useState(null);
	const [comentario, setComentario] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const openModal = (reto) => {
		setRetoSeleccionado(reto);
		setModalVisible(true);
	};

	const confirmarParticipar = async (data) => {
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

			const location = await Location.getCurrentPositionAsync({});

			const info = {
				usuario: {
					email: user.email,
					nombreUser: user.nombreUser,
				},
				reto: {
					nombre: retoSeleccionado.nombreReto,
					puntaje: retoSeleccionado.puntaje,
				},
				comentario: comentario,
				imagen: data.imagenPrueba,
				ubicacion: {
					latitud: location.coords.latitude,
					longitud: location.coords.longitude,
				},
				estado: 'pendiente',
			};

			const sanitize = (str) => str.toLowerCase().replace(/\s+/g, '_');

			const key = `participacion_${sanitize(
				retoSeleccionado.nombreReto
			)}_${sanitize(user.email)}`;

			const existe = await AsyncStorage.getItem(key);
			if (existe) {
				Alert.alert('Error', 'Ya has participado en este reto.');
				return;
			}

			console.log('Key: ' + key);

			console.log('Input completo: ' + JSON.stringify(info));

			await AsyncStorage.setItem(key, JSON.stringify(info));

			//return { ok: true };

			Alert.alert(
				'Registrado exitosamente',
				`Comentario: ${comentario}\nUbicación: ${location.coords.latitude.toFixed(
					4
				)}, ${location.coords.longitude.toFixed(4)}`
			);
		} catch (err) {
			console.error('Error al obtener ubicación', err);
			Alert.alert('Error', 'No se pudo obtener la ubicación');
		} finally {
			setModalVisible(false);
			setComentario('');
		}
	};

	useEffect(() => {
		const fetch = async () => {
			const data = (await fetchAllChallenges()) || [];
			setChallenges(data);
		};
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
							<Reto
								key={index}
								nombreReto={item.nombreReto}
								categoriaReto={item.categoriaReto}
								fechaLimiteReto={new Date(
									item.fechaLimite
								).toLocaleDateString('es-UY')}
								puntajeReto={item.puntaje}
								descripcionReto={item.descripcion}
								onPress={() => openModal(item)}
							/>
						)}
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
								onChange={setComentario}
								numberOfLines={4}
							/>
						</View>

						<Controller
							control={control}
							name='imagenPrueba'
							rules={{
								required: 'Una imagen de prueba es requerida',
							}}
							render={({ field: { onChange, value } }) => (
								<View>
									<View
										style={{
											alignItems: 'center',
											marginBottom: 10,
										}}
									>
										<Image
											source={
												value
													? { uri: value }
													: require('../../../assets/imagePlaceholder .jpg')
											}
											style={styles.image}
										/>
									</View>

									<View style={styles.modalButtonView}>
										<Button
											title='Elige desde la galeria'
											onPress={() =>
												pickFromGallery(onChange)
											}
										/>
									</View>

									<View style={styles.modalButtonView}>
										<Button
											title='Toma una foto'
											onPress={() => takePhoto(onChange)}
										/>
									</View>
								</View>
							)}
						/>

						{errors.imagenPrueba && (
							<Text style={styles.error}>
								{errors.imagenPrueba.message}
							</Text>
						)}

						<View
							style={{
								borderTopWidth: 2,
								borderTopColor: '#ccc',
								paddingTop: 7,
							}}
						>
							<View style={styles.modalButtonView}>
								<Button
									title='Confirmar participación'
									onPress={handleSubmit(confirmarParticipar)}
								/>
							</View>

							<View style={styles.modalButtonView}>
								<Button
									title='Cancelar'
									onPress={() => setModalVisible(false)}
									color='gray'
								/>
							</View>
						</View>
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
		marginVertical: 10,

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
	image: {
		width: 200,
		height: 200,
		borderRadius: 15,
		padding: 10,
		resizeMode: 'center',
	},
	modalButtonView: {
		marginBottom: 7,
	},
});
