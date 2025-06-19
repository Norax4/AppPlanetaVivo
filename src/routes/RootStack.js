import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from '../screens/HomeScreen';
import { RegisterUser } from '../screens/userScreens/RegisterUser';

const Stack = createNativeStackNavigator();

export function RootStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='HomeScreen'>
				<Stack.Screen
					name='HomeScreen'
					component={HomeScreen}
					options={{ title: 'Home' }}
				/>
				<Stack.Screen
					name='RegisterUser'
					component={RegisterUser}
					options={{ title: 'Registrar Usuario' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
