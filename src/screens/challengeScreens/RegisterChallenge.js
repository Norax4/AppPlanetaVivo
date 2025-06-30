import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';

import { CustomButton } from '../../components/CustomButton';
import { FormDropDown } from '../../components/FormDropDown';
import { FormDatePicker } from '../../components/FormDatePicker';
import { FormInputText } from '../../components/FormInputText';
import { FormInputTextArea } from '../../components/FormInputTextArea';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../database/authContext';
import { categoriasMateriales } from '../../database/categories';

export function RegisterChallenge({route, navigation}) {
	const { user } = useContext(AuthContext);
	const { challenge } = route.params ? route.params : ""; //Para poder editar un reto

	const {
		control,
		handleSubmit,
		reset,
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

	useEffect(() => {
		if (challenge != null) {
			reset(challenge);
		}
	}, [])

	const registerChallenge = async (challengeData) => {

		const info = {
			usuario: { nombreUser: user.nombreUser, email: user.email },
		};

		const completeChallenge = {
			...challengeData,
			...info
		}

		let key;
		
		if (challenge != null) {
			const keys = await AsyncStorage.getAllKeys();
			key = keys.find(k => k.indexOf(challenge.nombreReto) !== -1);
		} else {
			key = `reto_${challengeData.nombreReto}_${user.email}`;
		}

		await AsyncStorage.setItem(
			key,
			JSON.stringify(completeChallenge)
		);

		return { ok: true };
	};

	const onSubmit = async (data) => {
		console.log(data);

		try {
			await registerChallenge(data);

			Alert.alert('Exito', 'Reto registrado exitosamente', [
				{
					text: 'OK',
					onPress: () => navigation.navigate('HomeScreen'),
				},
			]);
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
					<FormInputText
						control={control}
						controllerName='nombreReto'
						requiredMessage='El nombre es requerido'
						patternValue={/[A-Za-z0-9]+/}
						patternMessage='Debe ingresar un nombre válido'
						inputPlaceHolder='Nombre del Reto'
						errors={errors}
					/>

					<FormInputTextArea
						control={control}
						controllerName='descripcion'
						requiredMessage='La descripción es requerida'
						patternValue={/[A-Za-z0-9]+/}
						patternMessage='Debe ingresar una descripción válida'
						inputPlaceHolder='Descripción'
						numberOfLines={6}
						errors={errors}
					/>

					<FormDropDown
						control={control}
						controllerName='categoriaReto'
						requiredMessage='La categoría es requerida'
						data={categoriasMateriales}
						dropDownPlaceholder='Seleccione la categoría'
						errors={errors}
					/>

					<FormDatePicker
						control={control}
						controllerName='fechaLimite'
						requiredMessage='Una fecha es requerida'
						errors={errors}
					/>

					<FormInputText
						control={control}
						controllerName='puntaje'
						requiredMessage='El puntaje es requerido'
						patternValue={/^[0-9]+$/}
						patternMessage='Debe ingresar el puntaje del reto'
						inputPlaceHolder='Puntaje'
						errors={errors}
					/>

					<CustomButton
						btnBgColor='#6892d5'
						onPress={handleSubmit(onSubmit)}
						btnText='Ingresar'
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

export const styles = StyleSheet.create({
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
});
