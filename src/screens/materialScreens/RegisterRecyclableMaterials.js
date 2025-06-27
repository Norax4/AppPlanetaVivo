import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import { InputText } from '../../components/InputText';
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { categoriasMat } from '../../database/categories';
import { Alert } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';

export function RegisterRecMats({navigation}) {
	const { user } = useContext(AuthContext);

	console.log('usuario:', user);

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	console.log(watch());

	const registerMaterial = async (material) => {
		const existe = await AsyncStorage.getItem(material.nombreMaterial.toLowerCase());
		if (existe) throw new Error('El material ya existe');

		const extraInfo = {
			usuario: {nombreUser: user.nombreUser, email: user.email}
		}

		const completeMaterial = {
			...material,
			...extraInfo
		}

		console.log(completeMaterial);

		await AsyncStorage.setItem(material.nombreMaterial, JSON.Stringify(completeMaterial));

		return {ok: true} //?
	}

	const onSubmit = async (data) => {
		console.log(data);

		try {
			await registerMaterial(data);

			Alert.alert("Exito", "Material registrado exitosamente");
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
							<Text style={styles.error}>{errors.nombreMaterial.message}</Text>
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