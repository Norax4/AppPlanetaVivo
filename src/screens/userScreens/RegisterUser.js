import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	Text,
	Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { FormInputNumber } from '../../components/FormInputNumber';
import { FormInputText } from '../../components/FormInputText';
import { CustomButton } from '../../components/CustomButton';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';
import { pickFromGallery, takePhoto } from '../../database/asyncPermissions';

export function RegisterUser({ navigation }) {
	const { user, login } = useContext(AuthContext);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const registerUser = async (regUser) => {
		const existe = await AsyncStorage.getItem(regUser.email.toLowerCase());
		if (existe) throw new Error('Usuario ya existe');

		const extraInfo = {
			points: 0,
		};

		const completeUser = {
			...regUser,
			...extraInfo,
		};

		await AsyncStorage.setItem(regUser.email, JSON.stringify(completeUser));

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
					<FormInputText
						control={control}
						controllerName='nombreUser'
						requiredMessage='El nombre de usuario es requerido'
						patternValue={/[A-Za-z0-9]+/}
						patternMessage='Debe ingresar un nombre válido'
						inputPlaceHolder='Nombre'
						errors={errors}
					/>

					<FormInputText
						control={control}
						controllerName='apellidoUser'
						requiredMessage='El apellido de usuario es requerido'
						patternValue={/[A-Za-z0-9]+/}
						patternMessage='Debe ingresar un apellido válido'
						inputPlaceHolder='Apellido'
						errors={errors}
					/>

					<FormInputText
						control={control}
						controllerName='email'
						requiredMessage='El email es requerido'
						patternValue={
							/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
						}
						patternMessage='Debe ingresar un email válido'
						inputPlaceHolder='Email'
						errors={errors}
					/>

					<FormInputNumber
						control={control}
						controllerName='edad'
						requiredMessage='Debe ingresar su edad'
						patternValue={/^[0-9]+$/}
						patternMessage='Solo se permiten números'
						placeholder='Edad'
						errors={errors}
					/>

					<FormInputText
						control={control}
						controllerName='zona'
						requiredMessage='La zona es requerida'
						patternValue={/[A-Za-z0-9]+/}
						patternMessage='No se permiten símbolos'
						inputPlaceHolder='Barrio o zona de residencia'
						errors={errors}
					/>

					<FormInputText
						control={control}
						controllerName='contrasenia'
						requiredMessage='La contrasenia es requerida'
						patternValue={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/}
						patternMessage='La contraseña debe contener al menos ocho caracteres, una mayúscula, una minúscula y un número'
						inputPlaceHolder='Contraseña'
						secureTextEntry={true}
						errors={errors}
					/>

					<FormInputText
						control={control}
						controllerName='confirmarContrasenia'
						requiredMessage='Debe confirmar su contraseña'
						inputPlaceHolder='Confirmar contraseña'
						secureTextEntry={true}
						errors={errors}
					/>

					<Text style={{fontSize: 20, marginTop: 15}}>¡Elige tu foto de perfil!</Text>
					<Controller
						control={control}
						name='imagenUser'
						rules={{
							required: 'Una imagen de perfil es requerida',
						}}
						render={({ field: { onChange, value } }) => (
							<>
								<CustomButton
									btnBgColor='#3caf74'
									btnText='Elige desde la galeria'
									onPress={() => pickFromGallery(onChange)}
								/>
								<CustomButton
									btnBgColor='#3caf74'
									btnText='Toma una foto'
									onPress={() => takePhoto(onChange)}
								/>
								{value && (
									<Image
										source={{ uri: value }}
										style={styles.image}
									/>
								)}
							</>
						)}
					/>
					{errors.imagenUser && (
						<Text style={styles.error}>
							{errors.imagenUser.message}
						</Text>
					)}

					<CustomButton
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
		marginBottom: 100,
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 30,
		margin: 10,
		padding: 10,
		alignSelf: 'center',
	},
});
