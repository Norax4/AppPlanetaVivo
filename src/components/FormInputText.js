import { Controller } from 'react-hook-form';
import { Text, View, StyleSheet } from 'react-native';

import { InputText } from './InputText';

export function FormInputText({
	control,
	controllerName,
	requiredText,
	patternValue,
	patterMessage,
	inputPlaceHolder,
	errors,
	secureTextEntry,
}) {
	const rules = {};

	let secureText = false;

	if (requiredText) {
		rules.required = requiredText;
	}

	if (patternValue && patterMessage) {
		rules.pattern = {
			value: patternValue,
			message: patterMessage,
		};
	}

	if (secureTextEntry) {
		secureText = true;
	}

	return (
		<View>
			<Controller
				control={control}
				name={controllerName}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<InputText
						placeholder={inputPlaceHolder}
						onChange={(text) => onChange(text)}
						onBlur={onBlur}
						value={value}
						secureTextEntry={secureText}
					/>
				)}
			/>
			{errors.controllerName && (
				<Text style={styles.error}>
					{errors.controllerName.message}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#c9fdd7',
	},
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
});
