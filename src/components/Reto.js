import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export function Reto({
	nombreReto,
	categoriaReto,
	fechaLimiteReto,
	puntajeReto,
	descripcionReto,
	onPress,
}) {
	return (
		<View style={styles.view}>
			<Text style={styles.text}>{nombreReto}</Text>

			<Text style={styles.text}>Categoría: {categoriaReto}</Text>

			<Text style={styles.text}>
				Fecha límite del reto: {fechaLimiteReto}
			</Text>

			<Text style={styles.text}>Puntaje del reto: {puntajeReto}</Text>

			<Text
				style={{
					fontSize: 18,
					fontWeight: 700,
					color: '#fff',
					marginTop: 5,
				}}
			>
				Descripción:
			</Text>
			<Text
				style={{
					fontSize: 18,
					fontWeight: 700,
					color: '#fff',
					marginBottom: 5,
				}}
			>
				{descripcionReto}
			</Text>
			<TouchableOpacity style={styles.button} onPress={onPress}>
				<Text style={styles.buttonText}>Participar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		marginTop: 25,
		padding: 3,
		paddingHorizontal: 10,
		borderRadius: 3,
		backgroundColor: '#085f63',
	},
	text: {
		fontSize: 18,
		fontWeight: 700,
		color: '#fff',
		marginVertical: 5,
	},
	button: {
		flex: 1,
		backgroundColor: '#6892d5',
		color: 'white',
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
		width: '100%',
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 20,
		fontWeight: 700,
	},
});
