import { View, Text } from 'react-native';
import { ProgressBarAndroidComponent } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';

export function UserPanel({navigation}) {
	const { user } = useContext(AuthContext);
	const puntos = 120; // Simulado
	const nivel = Math.floor(puntos / 100);

	return (
		<View>
			
			<Text>Nivel: {nivel}</Text>
			<Text>Puntos: {puntos}</Text>
			<ProgressBarAndroidComponent progreso={puntos % 100} />
			{/*Agregar un gráfico de retos por semana y mes con Victory Native oRecharts
			Agregar retos completados por el usuario*/}
		</View>
	);
}
