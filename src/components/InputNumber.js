import { TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
	textInput: {
		marginTop: 25,
		borderRadius: 3,
		paddingHorizontal: 10,
		fontSize: 16,
	},
});

export function InputNumber({ placeholder }) {
	const [edad, setEdad] = useState('');

	return (
		<TextInput
			style={[styles.textInput, { backgroundColor: '#fff' }]}
			placeholder={placeholder}
			keyboardType='numeric'
			maxLength={2}
			value={edad}
			onChangeText={(text) => {
				const valorNumerico = text.replace(/[^0-9]/g, '');
				setEdad(valorNumerico);
			}}
		/>
	);
}
