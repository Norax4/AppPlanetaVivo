import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function Button({ onPress, btnBgColor, btnText }) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: btnBgColor }]}
			onPress={onPress}
		>
			<Text style={styles.text}>{btnText}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		color: 'white',
		padding: 10,
		marginTop: 15,
		borderRadius: 5,
		width: '100%',
	},
	text: {
		color: 'white',
		fontSize: 20,
		fontWeight: 700,
	},
});
