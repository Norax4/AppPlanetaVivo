import { Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { DropDown } from './DropDown';

export function FormDropDown({
	control,
	controllerName,
	requiredMessage,
	data,
	dropDownPlaceholder,
	errors,
}) {
	const rules = {};

	if (requiredMessage) {
		rules.required = requiredMessage;
	}

	return (
		<View>
			<Controller
				control={control}
				name={controllerName}
				rules={rules}
				render={({ field: { onChange } }) => (
					<DropDown
						data={data}
						dropDownPlaceholder={dropDownPlaceholder}
						onChange={onChange}
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
