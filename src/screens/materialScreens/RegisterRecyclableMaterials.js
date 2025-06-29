import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
} from 'react-native';
import { useContext } from 'react';

import { AuthContext } from '../../database/authContext';

import { CustomButton } from '../../components/CustomButton';
import { FormDropDown } from '../../components/FormDropDown';
import { FormInputText } from '../../components/FormInputText';
import { categoriasMateriales } from '../../database/categories';
import { pickFromGallery, takePhoto } from '../../database/asyncPermissions';

export function RegisterRecMats({ navigation }) {
	const { user } = useContext(AuthContext);

	console.log('usuario:', user);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const registerMaterial = async (material) => {
		const existe = await AsyncStorage.getItem(
			material.nombreMaterial.toLowerCase()
		);
		if (existe) throw new Error('El material ya existe');

		const extraInfo = {
			usuario: { nombreUser: user.nombreUser, email: user.email },
		};

		const completeMaterial = {
			...material,
			...extraInfo,
		};

		console.log(completeMaterial);

		await AsyncStorage.setItem(
			material.nombreMaterial,
			JSON.stringify(completeMaterial)
		);

		return { ok: true }; //?
	};

	const onSubmit = async (data) => {
		console.log('click en ingresar');
		console.log(data);
		console.log(data.imagenMaterial);

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
					<FormInputText
						control={control}
						controllerName='nombreMaterial'
						requiredMessage='El nombre es requerido'
						patternValue={/[A-Za-z0-9]+/}
						patternMessage='Debe ingresar un nombre válido'
						inputPlaceHolder='Nombre del Material'
						errors={errors}
					/>

					<FormDropDown
						control={control}
						controllerName='categoria'
						requiredMessage='La categoría es requerida'
						data={categoriasMateriales}
						dropDownPlaceholder='Seleccione la categoría'
						errors={errors}
					/>

					<Controller
						control={control}
						name='imagenMaterial'
						rules={{
							required: 'Una imagen es requerida',
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
					{errors.imagenMaterial && (
						<Text style={styles.error}>
							{errors.imagenMaterial.message}
						</Text>
					)}

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
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 15,
		padding: 10,
		resizeMode: 'center',
	},
});
