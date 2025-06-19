import { TextInput, StyleSheet } from 'react-native';

export function InputText({
	placeholder,
	secureTextEntry,
	onChange,
	onBlur,
	value,
}) {
	return (
		<TextInput
			style={[styles.textInput, { backgroundColor: '#fff' }]}
			placeholder={placeholder}
			secureTextEntry={secureTextEntry}
			value={value}
			onChangeText={onChange}
			onBlur={onBlur}
		/>
	);
}

const styles = StyleSheet.create({
	textInput: {
		marginTop: 25,
		borderRadius: 3,
		paddingHorizontal: 10,
		fontSize: 18,
	},
});
