import { TextInput, StyleSheet } from 'react-native';

export function InputTextArea({
	placeholder,
	secureTextEntry,
	onChange,
	onBlur,
	value,
	numberOfLines,
}) {
	return (
		<TextInput
			style={[
				styles.textInput,
				{ backgroundColor: '#fff' },
				{ height: numberOfLines * 24 },
			]}
			placeholder={placeholder}
			secureTextEntry={secureTextEntry}
			value={value}
			onChangeText={onChange}
			onBlur={onBlur}
			multiline={true}
			numberOfLines={numberOfLines}
		/>
	);
}

const styles = StyleSheet.create({
	textInput: {
		marginTop: 25,
		borderRadius: 3,
		paddingHorizontal: 10,
		fontSize: 18,
		textAlignVertical: 'top',
	},
});
