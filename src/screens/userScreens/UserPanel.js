import { View, Text, Alert } from 'react-native';
import { ProgressBarAndroidComponent } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';
import { Button } from '../../components/Button';

export function UserPanel({navigation}) {
	const { user, logout } = useContext(AuthContext);
	const puntos = 120; // Simulado
	const nivel = Math.floor(puntos / 100);

	const logoutAlert = () => {
		<View>
			<Text>
				
			</Text>
		</View>
	}

	return (
		<View>
			
			<Text>Nivel: {nivel}</Text>
			<Text>Puntos: {puntos}</Text>
			<ProgressBarAndroidComponent progreso={puntos % 100} />
			{/*Agregar un gráfico de retos por semana y mes con Victory Native oRecharts
			Agregar retos completados por el usuario*/}

			<Button btnText="Cerrar Sesión"
			onPress={logoutAlert()}/>
		</View>
	);
}
