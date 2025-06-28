import { Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { InputNumber } from './InputNumber';

export function FormInputNumber({
	control,
	controllerName,
	requiredMessage,
	patternValue,
	patternMessage,
	placeholder,
	errors,
}) {
	const rules = {};

	if (requiredMessage) {
		rules.required = requiredMessage;
	}

	if (patternValue && patternMessage) {
		rules.pattern = {
			value: patternValue,
			message: patternMessage,
		};
	}

	return (
		<View>
			<Controller
				control={control}
				name={controllerName}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<InputNumber
						placeholder={placeholder}
						onChange={(text) =>
							onChange(text.replace(/[^0-9]/g, ''))
						}
						onBlur={onBlur}
						value={value}
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
