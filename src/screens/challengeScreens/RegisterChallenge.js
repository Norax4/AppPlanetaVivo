import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';

import { InputText } from '../../components/InputText';
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function RegisterChallenge({navigation}) {
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	console.log(watch());

	const registerChallenge = async (challenge) => {
		const extraInfo = {

		}

		const completeChallenge = {
			challenge, extraInfo
		}

	}

	const onSubmit = (data) => {
		console.log(data);

		
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				<ScrollView style={styles.scrollView}>
					<Controller
						control={control}
						name='nombreReto'
						rules={{
							required: 'El nombre es requerido',
							pattern: {
								value: /[A-Za-z0-9]+/,
								message: 'Debe ingresar un nombre válido',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Nombre del Reto'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
						/>
						{errors.nombreReto && (
							<Text style={styles.error}>{errors.email.message}</Text>
						)}

					<Controller
						control={control}
						name='descripcion'
						rules={{
							required: 'La descripción es requerida',
							pattern: {
								value: /[A-Za-z0-9]+/,
								message: 'Debe ingresar una descripción',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText
								placeholder='Descripción'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value}
							/>
						)}
						/>
						{errors.nombreReto && (
							<Text style={styles.error}>{errors.email.message}</Text>
						)}

					<Controller
						control={control}
						name='categoria'
						rules={{
							required: 'La categoria es requerida'
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								<Text>Seleccione una Categoría:</Text>
								<SelectDropdown
									//data={[]}
									onSelect={(selectedItem, index) => {
										console.log(selectedItem, index)
									}}
									renderButton={(selectedItem, isOpened) => {
										return (
											<View> {/*Añadir estilos luego*/}
												<Text>
													{selectedItem && selectedItem.title || 'Selecciona '}
												</Text>
												<Icon name={isOpened ? 'chevron-up' : 'chevron-down'}/>
											</View>
										);
									}}
									renderItem={(item, isSelected) => {
										return (
											<View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
												<Icon name={item.icon} style={styles.dropdownItemIconStyle} />
												<Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
											</View>
										);
									}}
									showsVerticalScrollIndicator={false}
								/>
							</>
						)}
						/>

					<Controller
						control={control}
						name='fechaLimite'
						defaultValue={Date.now()}
						rules={{
							required: 'Una fecha es requerida'
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							//Usar DatePicker?
							<InputText 
								placeholder='Fecha limite'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value} 
							/>
						)}
						/>

					<Controller
						control={control}
						name='puntaje'
						rules={{
							required: 'El puntaje es requerido',
							pattern: {
								value: /^[0-9]+$/,
								message: "Debe ingresar el puntaje del reto"
							}
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<InputText 
								placeholder='Puntaje'
								onChange={(text) => onChange(text)}
								onBlur={onBlur}
								value={value} 
							/>
						)}
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

export const styles = StyleSheet.create({ //edit stylesheet
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