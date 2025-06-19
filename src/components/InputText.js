import { TextInput, StyleSheet } from 'react-native';
import { use, useState } from 'react';

const styles = StyleSheet.create({
	textInput: {
		marginTop: 25,
		borderRadius: 3,
		paddingHorizontal: 10,
		fontSize: 16,
	},
});

export function InputText({ placeholder, secureTextEntry }) {
	const [input, setInput] = useState('');

	return (
		<TextInput
			style={[styles.textInput, { backgroundColor: '#fff' }]}
			placeholder={placeholder}
			secureTextEntry={secureTextEntry}
			value={input}
			onChange={(text) => setInput(text)}
		/>
	);
}
