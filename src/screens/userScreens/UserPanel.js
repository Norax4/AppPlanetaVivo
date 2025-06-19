import { View, Text } from 'react-native';
import ProgressBar from '../components/ProgressBar';

export function UserPanel() {
	const puntos = 120; // Simulado
	const nivel = Math.floor(puntos / 100);

	return (
		<View>
			<Text>Nivel: {nivel}</Text>
			<Text>Puntos: {puntos}</Text>
			<ProgressBar progreso={puntos % 100} />
			//Agregar un gráfico de retos por semana con Victory Native o
			Recharts
		</View>
	);
}
