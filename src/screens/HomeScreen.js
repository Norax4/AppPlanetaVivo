import React, { useContext } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { Button } from '../components/Button';
import { AuthContext } from '../database/authContext';

export function HomeScreen({ navigation }) {
	const { user, loading, logout } = useContext(AuthContext);

	console.log('logged user:', user);

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				<ScrollView style={styles.scrollView}>
					{user == null ? (
						<>
							<Button
								onPress={() =>
									navigation.navigate('RegisterUser')
								}
								btnBgColor={'#6892d5'}
								btnText={'Registrar Usuario'}
							/>

							<Button
								onPress={() => navigation.navigate('LoginUser')}
								btnBgColor={'#6892d5'}
								btnText={'Ingrese a su cuenta'}
							/>
						</>
					) : (
						<>
							<Button
								onPress={() =>
									navigation.navigate('RegisterChallenge')
								}
								btnBgColor={'#6892d5'}
								btnText={'Registro de retos'}
							/>
							<Button
								onPress={() =>
									navigation.navigate('ChallengesList')
								}
								btnBgColor={'#6892d5'}
								btnText={'Lista de retos'}
							/>
							<Button
								onPress={() =>
									navigation.navigate(
										'RegisterRecyclableMaterials'
									)
								}
								btnBgColor={'#6892d5'}
								btnText={'Registrar materiales reciclables'}
							/>
							<Button
								onPress={() => navigation.navigate('UserPanel')}
								btnBgColor={'#6892d5'}
								btnText={'Panel de usuario'}
							/>
						</>
					)}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
	},
	view: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#c9fdd7',
	},
	scrollView: {
		marginHorizontal: 30,
	},
});
