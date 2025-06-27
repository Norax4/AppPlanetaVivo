import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';

import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { fetchAllChallenges } from '../../database/fetchFunctions';

export function ChallengesList({ navigation }) {
	const [challenges, setChallenges] = useState([]);

	useEffect(() => {
		fetchAllChallenges(); //manejar setting de la lista
	}, []);

    const Item = (object) => {
        <View>
            <Button btnText={object.nombreReto} 
            //btnBgColor = ??
            onPress={() => navigation.navigate('SelectedChallenge', {object})}/>
        </View>
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.view}>
                <View style={styles.view}>
                    {challenges <= 0 ? (
                        <Text> No hay retos actualmente. </Text>
                    ): (
                        <FlatList 
                        data = {challenges}
                        renderItem={({item}) => <Item object={item}/>}
                        keyExtractor={item => item.id}
                        />
                    )}
                </View>
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
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
});
