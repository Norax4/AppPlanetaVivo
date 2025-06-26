import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import * as ImagePicker from 'expo-image-picker'; //manejar la subida de imagenes desde el dispositivo
import { InputText } from '../../components/InputText';
import { InputNumber } from '../../components/InputNumber';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';

export function RegisterUser({ navigation }) {
	const { user, login } = useContext(AuthContext);

	const {
		control,
		handleSubmit,
		getValues,
		watch,
		formState: { errors },
	} = useForm();

	//console.log(watch());

	const registerUser = async (regUser) => {
		const existe = await AsyncStorage.getItem(regUser.email);
		if (existe) throw new Error('Usuario ya existe');

		const extraInfo = {
			points: 0,
		};

		const completeUser = {
			...regUser,
			...extraInfo,
		};

		await AsyncStorage.setItem(regUser.email, JSON.stringify(completeUser));

		// assuming login throws if it fails
		return await login(regUser.email, regUser.contrasenia);
	};

	const onSubmit = async (data) => {
		if (user != null) {
			return Alert.alert('Error', 'Usted ya está logueado.', [
				{
					text: 'OK',
					onPress: () => navigation.navigate('HomeScreen'),
				},
			]);
		}

		try {
			await registerUser(data);

			Alert.alert('Éxito', 'Usuario registrado y logueado.', [
				{
					text: 'OK',
					onPress: () => navigation.navigate('HomeScreen'),
				},
			]);
		} catch (err) {
			console.error(err);
			Alert.alert(
				'Error',
				err.message || 'No se pudo registrar el usuario.',
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
						name='nombreUser'
						rules={{
							required: 'El nombre de usuario es requerido',
							pattern: {
								value: /[A-Za-z0-9]+/,
								message: 'Debe ingresar un nombre válido',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Nombre y Apellido'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					{errors.nombreUser && (
						<Text style={styles.error}>
							{errors.nombreUser.message}
						</Text>
					)}

					<Controller
						control={control}
						name='email'
						rules={{
							required: 'El email es requerido',
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: 'Debe ingresar un email válido',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Email'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					{errors.email && (
						<Text style={styles.error}>{errors.email.message}</Text>
					)}

					<Controller
						control={control}
						name='edad'
						rules={{
							required: 'Debe ingresar su edad',
							pattern: {
								value: /^[0-9]+$/,
								message: 'Solo se permiten números',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputNumber
								placeholder='Edad'
								onChange={(text) =>
									onChange(text.replace(/[^0-9]/g, ''))
								}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					{errors.edad && (
						<Text style={styles.error}>{errors.edad.message}</Text>
					)}

					<Controller
						control={control}
						name='zona'
						rules={{
							required: 'La zona es requerida',
							pattern: {
								value: /[A-Za-z0-9]+/,
								message: 'No se permiten símbolos',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Barrio o zona de residencia'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					{errors.zona && (
						<Text style={styles.error}>{errors.zona.message}</Text>
					)}

					<Controller
						control={control}
						name='contrasenia'
						rules={{
							required: 'Contraseña requerida',
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
								message:
									'La contraseña debe contener al menos ocho caracteres, una mayúscula, una minúscula y un número',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Contraseña'
								secureTextEntry={true}
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					{errors.contrasenia && (
						<Text style={styles.error}>
							{errors.contrasenia.message}
						</Text>
					)}

					<Controller
						control={control}
						name='confirmarContrasenia'
						rules={{
							required: 'Debe confirmar su contraseña',
							validate: (value) =>
								value === getValues('contrasenia') ||
								'Las contraseñas no coinciden',
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Confirmar contraseña'
								secureTextEntry={true}
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					{errors.confirmarContrasenia && (
						<Text style={styles.error}>
							{errors.confirmarContrasenia.message}
						</Text>
					)}

					<Button
						btnBgColor='#6892d5'
						onPress={handleSubmit(onSubmit)}
						btnText='Enviar'
					/>
				</ScrollView>
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
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
});
