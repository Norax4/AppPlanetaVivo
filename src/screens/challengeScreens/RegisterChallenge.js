import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';

import { InputText } from '../../components/InputText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';
import { Alert } from 'react-native';
import { categoriasMat } from '../../database/categories';

export function RegisterChallenge({navigation}) {
	const {user} = useContext(AuthContext);

	console.log('usuario:',user);

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm(/*{
		defaultValues: {
			nombreReto: '',
			descripcion: '',
			categoria: '',
			fechaLimite: '',
			puntaje: ''
		}
	}*/);
	
	console.log(watch());

	const registerChallenge = async (challenge) => {
		const existe = await AsyncStorage.getItem(challenge.nombreReto.toLowerCase());
		if (existe) throw new Error('El reto ya existe');

		const extraInfo = {
			usuario: {nombreUser: user.nombreUser, email: user.email}
		}

		const completeChallenge = {
			...challenge, ...extraInfo
		}

		await AsyncStorage.setItem(challenge.nombreReto, JSON.stringify(completeChallenge));

		return {ok: true};
	}

	const onSubmit = async (data) => {
		console.log(data);

		try {
			await registerChallenge(data)

			Alert.alert("Exito", "Reto registrado exitosamente",
				[{text: 'OK', onPress: () => navigation.navigate('HomeScreen')}]
			);
		} catch (err) {
			console.error(err);
			Alert.alert(
				'Error',
				err.message || 'No se pudo registrar el reto.',
				[{ text: 'OK' }]
			);
		}
		
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				<ScrollView style={styles.scrollView}>
					<Controller
						control={control}
						name='nombreReto'
						rules={{
							required: 'El nombre es requerido',
							pattern: {
								value: /[A-Za-z0-9]+/,
								message: 'Debe ingresar un nombre válido',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Nombre del Reto'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
						/>
						{errors.nombreReto && (
							<Text style={styles.error}>{errors.nombreReto.message}</Text>
						)}

					<Controller
						control={control}
						name='descripcion'
						rules={{
							required: 'La descripción es requerida',
							pattern: {
								value: /[A-Za-z0-9]+/,
								message: 'Debe ingresar una descripción',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Descripción'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
						/>
						{errors.descripcion && (
							<Text style={styles.error}>{errors.descripcion.message}</Text>
						)}

					<Text>Seleccione una Categoría:</Text>
					<Controller
						control={control}
						name='categoria'
						rules={{
							required: 'La categoria es requerida',
						}}
						render={({ field: { onChange, value } }) => (
								<SelectDropdown
									data={categoriasMat} //Array de categorias
									onSelect={(selectedItem) => {
										onChange(selectedItem)
									}}
									defaultValue={value}
									renderButton={(selectedItem, isOpened) => {
										return (
											<View> {/*Añadir estilos luego*/}
												<Text>
													{selectedItem || 'Selecciona '}
												</Text>
												<Icon name={isOpened ? 'chevron-up' : 'chevron-down'}/>
											</View>
										);
									}}
								renderItem={(item) => {
									return (
										<View>
											<Text>{item}</Text>
										</View>
									);
								}}
							/>
						)}
						/>

					<Controller
						control={control}
						name='fechaLimite'
						//defaultValue={Date.now()}
						rules={{
							required: 'Una fecha es requerida'
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							//Usar DatePicker?
							<InputText 
								placeholder='Fecha limite'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value} 
							/>
						)}
						/>
						

					<Controller
						control={control}
						name='puntaje'
						rules={{
							required: 'El puntaje es requerido',
							pattern: {
								value: /^[0-9]+$/,
								message: "Debe ingresar el puntaje del reto",
								min: 20,
								max: 70
							}
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText 
								placeholder='Puntaje'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value} 
							/>
						)}
						/>
						{errors.puntaje && (
							<Text style={styles.error}>{errors.puntaje.message}</Text>
						)}

						<Button
							btnBgColor='#6892d5'
							onPress={handleSubmit(onSubmit)}
							btnText='Ingresar'
						/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

export const styles = StyleSheet.create({ //edit stylesheet
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
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
});