import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';

import { Button } from '../../components/Button';
import { FormInputText } from '../../components/FormInputText';
import { AuthContext } from '../../database/authContext';

export function LoginUser({ navigation }) {
	const { login } = useContext(AuthContext);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const response = await login(data.email, data.contrasenia);

		if (response.ok) {
			Alert.alert(
				'Exito',
				response.message,
				[
					{
						text: 'OK',
						onPress: () => navigation.navigate('HomeScreen'),
					},
				],
				{ cancelable: false }
			);
		} else {
			Alert.alert(
				'Error',
				response.message,
				[
					{
						text: 'OK',
					},
				],
				{ cancelable: false }
			);
		}
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				<ScrollView style={styles.scrollView}>
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

					<FormInputText
						control={control}
						controllerName='contrasenia'
						requiredMessage='Contraseña requerida'
						inputPlaceHolder='Contraseña'
						errors={errors}
						secureTextEntry={true}
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
