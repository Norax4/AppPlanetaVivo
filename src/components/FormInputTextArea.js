import { Controller } from 'react-hook-form';
import { Text, View, StyleSheet } from 'react-native';

import { InputTextArea } from './InputTextArea';

export function FormInputTextArea({
	control,
	controllerName,
	requiredMessage,
	patternValue,
	patternMessage,
	inputPlaceHolder,
	errors,
	secureTextEntry,
	numberOfLines,
}) {
	const rules = {};

	let secureText = false;

	if (requiredMessage) {
		rules.required = requiredMessage;
	}

	if (patternValue && patternMessage) {
		rules.pattern = {
			value: patternValue,
			message: patternMessage,
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
					<InputTextArea
						placeholder={inputPlaceHolder}
						onChange={(text) => onChange(text)}
						onBlur={onBlur}
						value={value}
						secureTextEntry={secureText}
						numberOfLines={numberOfLines}
					/>
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
});
