import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';

import { InputText } from '../../components/InputText';
import { InputNumber } from '../../components/InputNumber';
import { Button } from '../../components/Button';

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
});

export function RegisterUser({ navigation }) {
	const [formValues, setFormValues] = useState({
		email: '',
		edad: '',
		zona: '',
		contrasenia: '',
		confirmarContrasenia: '',
		fotoPerfil: '',
	});

	const clearData = () => {
		setFormValues({
			email: '',
			edad: '',
			zona: '',
			contrasenia: '',
			confirmarContrasenia: '',
			fotoPerfil: '',
		});
	};

	const registerUser = async () => {
		console.log('states', userName, password, email, age, residenceZone);

		if (!userName.trim()) {
			Alert.alert('Ingrese su nombre de usuario');
			return;
		}
		if (!password.trim()) {
			Alert.alert('Ingrese su password');
			return;
		}
		if (
			!email.trim() &&
			email.indexOf('@') < 1 &&
			email.indexOf('.com') === -1
		) {
			Alert.alert('Ingrese su email correctamente');
			return;
		}
		if (!age.trim()) {
			Alert.alert('Ingrese su edad');
			return;
		}
		if (!residenceZone.trim()) {
			Alert.alert('');
		}

		try {
			const user = {
				userName,
				email,
				password,
				age,
				residenceZone,
				profilePic,
			};
			//AsyncStorage use email as key
		} catch (error) {
			//console error return
		}
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				<ScrollView style={styles.scrollView}>
					<InputText placeholder='Email' />
					<InputNumber placeholder='Edad' />
					<InputText placeholder='Barrio o zona de residencia' />
					<InputText
						placeholder='Contraseña'
						secureTextEntry={true}
					/>
					<InputText
						placeholder='Confirmar contraseña'
						secureTextEntry={true}
					/>
					<Button
						btnBgColor='#6892d5'
						onPress={() => alert('enviado')}
						btnText='Enviar'
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
