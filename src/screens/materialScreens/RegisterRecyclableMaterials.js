import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import { InputText } from '../../components/InputText';
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';

export function RegisterRecMats({navigation}) {
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	console.log(watch());

	const onSubmit = (data) => {
		console.log(data);
		
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
							<Text style={styles.error}>{errors.email.message}</Text>
						)}

					<Controller
						control={control}
						name='categoria'
						rules={{
							required: 'La categoria es requerida',
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								<Text>Seleccione una Categoría:</Text>
								<SelectDropdown
									//data={[]} //Array de categorias
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