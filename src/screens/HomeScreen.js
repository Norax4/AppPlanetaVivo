import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { Button } from '../components/Button';

export function HomeScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.view}>
				<ScrollView style={styles.scrollView}>
					<Button
						onPress={() => navigation.navigate('RegisterUser')}
						btnBgColor={'#6892d5'}
						btnText={'Registro de Usuarios'}
					/>
					<Button
						onPress={() => navigation.navigate('RegisterChallenge')}
						btnBgColor={'#6892d5'}
						btnText={'Registro de retos'}
					/>
					<Button
						onPress={() => navigation.navigate('ChallengesList')}
						btnBgColor={'#6892d5'}
						btnText={'Lista de retos'}
					/>
					<Button
						onPress={() =>
							navigation.navigate('RegisterRecyclableMaterials')
						}
						btnBgColor={'#6892d5'}
						btnText={'Registrar materiales reciclables'}
					/>
					<Button
						onPress={() => navigation.navigate('UserPanel')}
						btnBgColor={'#6892d5'}
						btnText={'Panel de usuario'}
					/>
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
