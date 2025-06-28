import AsyncStorage from '@react-native-async-storage/async-storage';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { DropDown } from '../../components/DropDown';
import { FormInputText } from '../../components/FormInputText';
import { Alert } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';
import { categoriasMateriales } from '../../database/categories';

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
					<FormInputText
						control={control}
						controllerName='nombreReto'
						requiredText='El nombre es requerido'
						patternValue={/[A-Za-z0-9]+/}
						patterMessage='Debe ingresar un nombre válido'
						inputPlaceHolder='Nombre del Reto'
						errors={errors}
					/>

					<FormInputText
						control={control}
						controllerName='descripcion'
						requiredText='La descripción es requerida'
						patternValue={/[A-Za-z0-9]+/}
						patterMessage='Debe ingresar una descripción válida'
						inputPlaceHolder='Descripción'
						errors={errors}
					/>

					{/* Falta crear componente de form para dropdown */}
					<Controller
						control={control}
						name='reto'
						rules={{
							required: 'El reto es requerido',
						}}
						render={({ field: { onChange } }) => (
								<DropDown
									data={categoriasMateriales}
									dropDownPlaceholder='Seleccione el tipo de reto'
									onChange={onChange}
								/>
						)}
					/>
					{errors.reto && (
						<Text style={styles.error}>{errors.reto.message}</Text>
					)}

					{/* Actualizar a un DatePicker */}
					<FormInputText
						control={control}
						controllerName='fechaLimite'
						requiredText='Una fecha es requerida'
						inputPlaceHolder='Fecha limite'
						errors={errors}
					/>

					<FormInputText
						control={control}
						controllerName='puntaje'
						requiredText='El puntaje es requerido'
						patternValue={/^[0-9]+$/}
						patterMessage='Debe ingresar el puntaje del reto'
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
	//edit stylesheet
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
