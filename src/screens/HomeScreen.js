import React, { useContext } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { AuthContext } from '../database/authContext';

export function HomeScreen({ navigation }) {
	const { user, loading, logout } = useContext(AuthContext);

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
							<CustomButton
								onPress={() =>
									navigation.navigate('RegisterUser')
								}
								btnBgColor={'#6892d5'}
								btnText={'Registrar Usuario'}
							/>

							<CustomButton
								onPress={() => navigation.navigate('LoginUser')}
								btnBgColor={'#6892d5'}
								btnText={'Ingrese a su cuenta'}
							/>
						</>
					) : (
						<>
							<CustomButton
								onPress={() =>
									navigation.navigate('RegisterChallenge')
								}
								btnBgColor={'#6892d5'}
								btnText={'Registro de retos'}
							/>
							<CustomButton
								onPress={() =>
									navigation.navigate('ChallengesList')
								}
								btnBgColor={'#6892d5'}
								btnText={'Lista de retos'}
							/>
							<CustomButton
								onPress={() =>
									navigation.navigate(
										'RegisterRecyclableMaterials'
									)
								}
								btnBgColor={'#6892d5'}
								btnText={'Registrar materiales reciclables'}
							/>
							<CustomButton
								onPress={() => navigation.navigate('UserPanel')}
								btnBgColor={'#6892d5'}
								btnText={'Panel de usuario'}
							/>
							<CustomButton
								onPress={() => logout()}
								btnBgColor={'#ff8c94'}
								btnText={'Cerrar sesión'}
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
		marginBottom: 100,
	},
});
