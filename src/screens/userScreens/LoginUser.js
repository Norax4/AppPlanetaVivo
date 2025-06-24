import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { InputText } from '../../components/InputText';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';

export function LoginUser({navigation}){
	const {login} = useContext(AuthContext);

    const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

    console.log(watch());

    const onSubmit = (data) => {
		const response = login(data.email, data.contrasenia); //Funcion login del contexto de la aplicación (AuthContext)
		let message = response.message;
		if (response.ok) {
			Alert.alert("Exito", {message}, 
			[{text: "OK", onPress: () => navigation.navigate("HomeScreen")}], 
			{ cancelable: false });
		} else if (!response.ok && response.message === "Usted ya esta loggeado a la app.") {
			Alert.alert("Error", {message}, 
			[{text: "OK", onPress: () => navigation.navigate("HomeScreen")}], 
			{ cancelable: false });
		} else {
			Alert.alert("Error", {message});
		}
	}

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.view}>
                <ScrollView style={styles.scrollView}>
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
							{/*errors.contrasenia && (
							<Text style={styles.error}>
								{errors.contrasenia.message}
							</Text>
							)*/}

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