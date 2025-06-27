import { View, Text } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../database/authContext';
import { Button } from '../../components/Button';

export function UserPanel() {
	const { user, logout } = useContext(AuthContext);
	const puntos = 120; // Simulado
	const nivel = Math.floor(puntos / 100);

	console.log('usuario:', user);

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
			{/*<ProgressBarAndroidComponent progreso={puntos % 100} /> Usar Progress.Bar*/}
			{/*Agregar un gráfico de retos por semana y mes con Victory Native oRecharts
			Agregar retos completados por el usuario*/}

			<Button 
			onPress={logoutAlert()}
			btnText="Cerrar Sesión"
			btnBgColor="#ad1409"
			/>
		</View>
	);
}
