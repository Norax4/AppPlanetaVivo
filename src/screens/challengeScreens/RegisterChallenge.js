import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';

import { Button } from '../../components/Button';
import { FormDropDown } from '../../components/FormDropDown';
import { FormInputText } from '../../components/FormInputText';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';
import { categoriasMateriales } from '../../database/categories';

export function RegisterChallenge({route, navigation}) {
	const {user} = useContext(AuthContext);
	const {challenge} = route.params;

	console.log('usuario:', user);

	const {
		control,
		handleSubmit,
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

	const registerChallenge = async (challenge) => {
		const existe = await AsyncStorage.getItem(
			challenge.nombreReto.toLowerCase()
		);
		if (existe) throw new Error('El reto ya existe');

		const extraInfo = {
			usuario: { nombreUser: user.nombreUser, email: user.email },
		};

		const completeChallenge = {
			...challenge,
			...extraInfo,
		};

		await AsyncStorage.setItem(
			challenge.nombreReto,
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

					<FormInputText
						control={control}
						controllerName='descripcion'
						requiredMessage='La descripción es requerida'
						patternValue={/[A-Za-z0-9]+/}
						patternMessage='Debe ingresar una descripción válida'
						inputPlaceHolder='Descripción'
						errors={errors}
					/>

					<FormDropDown
						control={control}
						controllerName='reto'
						requiredMessage='El reto es requerido'
						data={categoriasMateriales}
						dropDownPlaceholder='Seleccione el tipo de reto'
						errors={errors}
					/>

					{/* Actualizar a un DatePicker */}
					<FormInputText
						control={control}
						controllerName='fechaLimite'
						requiredMessage='Una fecha es requerida'
						inputPlaceHolder='Fecha limite'
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
