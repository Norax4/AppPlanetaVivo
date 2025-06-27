import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DropDown } from '../../components/DropDown';
import { Alert } from 'react-native';
import { Button } from '../../components/Button';
import { InputText } from '../../components/InputText';
import { categoriasMateriales } from '../../database/categories';

export function RegisterRecMats({ navigation }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const registerMaterial = async (data) => {};

	const onSubmit = async (data) => {
		console.log('click en ingresar');
		console.log(data);

		try {
			await registerMaterial(data);

			Alert.alert('Exito', 'Material registrado exitosamente');
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
						name='nombreMaterial'
						rules={{
							required: 'El nombre es requerido',
							pattern: {
								value: /[A-Za-z]+/,
								message: 'Debe ingresar un nombre válido',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Nombre del Material'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					{errors.nombreMaterial && (
						<Text style={styles.error}>
							{errors.nombreMaterial.message}
						</Text>
					)}

					<Controller
						control={control}
						name='categoria'
						rules={{
							required: 'La categoria es requerida',
						}}
						render={({ field: { onChange } }) => (
							<>
								<DropDown
									data={categoriasMateriales}
									onChange={onChange}
								/>
							</>
						)}
					/>
					{errors.categoria && (
						<Text style={styles.error}>
							{errors.categoria.message}
						</Text>
					)}

					{/* Usar image picker para insertar una imagen */}

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
