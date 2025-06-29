import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

export function FormDatePicker({
	control,
	controllerName,
	requiredMessage,
	errors,
}) {
	const [show, setShow] = useState(false);

	return (
		<View>
			<Controller
				control={control}
				name={controllerName}
				rules={{ required: requiredMessage }}
				render={({ field: { onChange, value } }) => (
					<View style={styles.datePicker}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => setShow(true)}
						>
							<Text style={styles.buttonText}>
								{value
									? new Date(value).toLocaleDateString()
									: 'Seleccionar fecha límite'}
							</Text>
						</TouchableOpacity>

						{show && (
							<DateTimePicker
								value={value ? new Date(value) : new Date()}
								minimumDate={new Date()}
								mode='date'
								display='default'
								onChange={(event, selectedDate) => {
									setShow(Platform.OS === 'ios'); // keep open on iOS
									if (selectedDate) {
										onChange(selectedDate.toISOString());
									}
								}}
							/>
						)}
					</View>
				)}
			/>
			{errors[controllerName] && (
				<Text style={styles.error}>
					{errors[controllerName].message}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
	datePicker: {
		marginTop: 25,
		borderRadius: 3,
		fontSize: 18,
		textAlignVertical: 'top',
	},
	button: {
		backgroundColor: '#000',
		padding: 12,
		marginTop: 15,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
