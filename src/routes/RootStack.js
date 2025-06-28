import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from '../screens/HomeScreen';
import { RegisterUser } from '../screens/userScreens/RegisterUser';
import { RegisterRecMats } from '../screens/materialScreens/RegisterRecyclableMaterials';
import { RegisterChallenge } from '../screens/challengeScreens/RegisterChallenge';
import { ChallengesList } from '../screens/challengeScreens/ChallengesList';
import { LoginUser } from '../screens/userScreens/LoginUser';
import { SelectedChallenge } from '../screens/challengeScreens/SelectedChallenge';
import { UserPanel } from '../screens/userScreens/UserPanel';

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
					name='LoginUser'
					component={LoginUser}
					options={{ title: 'Ingrese a su cuenta' }}
				/>
				<Stack.Screen
					name='UserPanel'
					component={UserPanel}
					options={{ title: 'Ingrese a su cuenta' }}
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
				<Stack.Screen 
					name='ChallengesList'
					component={ChallengesList}
					options={{ title: 'Retos disponibles' }}
				/>
				<Stack.Screen 
					name='SelectedChallenge'
					component={SelectedChallenge}
					options={{ title: 'Reto seleccionado'}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
