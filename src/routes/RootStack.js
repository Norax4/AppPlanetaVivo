import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from '../screens/HomeScreen';
import { RegisterUser } from '../screens/userScreens/RegisterUser';
import { RegisterRecMats } from '../screens/materialScreens/RegisterRecyclableMaterials';
import { RegisterChallenge } from '../screens/challengeScreens/RegisterChallenge';

const Stack = createNativeStackNavigator();

export function RootStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='HomeScreen'>
				<Stack.Screen
					name='HomeScreen'
					component={HomeScreen}
					options={{ title: 'Inicio' }}
				/>
				<Stack.Screen
					name='RegisterUser'
					component={RegisterUser}
					options={{ title: 'Registrar Usuario' }}
				/>
				<Stack.Screen 
					name='RegisterRecyclableMaterials'
					component={RegisterRecMats}
					options={{ title: 'Ingresar un Material Reciclable'}}
				/>
				<Stack.Screen 
					name='RegisterChallenge'
					component={RegisterChallenge}
					options={{ title: 'Crear un Reto'}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
