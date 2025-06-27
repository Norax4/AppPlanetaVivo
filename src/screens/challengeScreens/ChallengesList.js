import { StyleSheet, View, SafeAreaView, ScrollView, Text, FlatList} from 'react-native';

import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ChallengesList({ navigation }) {
	const [challenges, setChallenges] = useState([]);

	useEffect(() => {
		const fetchAllChallenges = async () => {
            try{
                const keys = await AsyncStorage.getAllKeys();
                const data = await AsyncStorage.multiGet(keys);
                const challengesList = data.map(([key, value]) => {
                    try {
                        return JSON.parse(value);
                        } catch (e) {
                        // Si no es un JSON válido, se ignora
                        return null;
                        }
                    })
                    .filter(item => item && item.nombreReto);
                
                    console.log(challengesList);
                if (challengesList.length > 0) {
                    setChallenges(challengesList);
                }
            }catch(error){
                console.log('Error al conseguir usuarios', error);
                return error;
            }
        };
        fetchAllChallenges()
	}, []);

    const Item = (object) => {
        <View key={object.nombreReto} style={styles.itemView} >
            <Text>{object.nombreReto}</Text>
            {/*<Button 
            onPress={() => navigation.navigate('SelectedChallenge', {object})}
            btnText={object.nombreReto} 
            btnBgColor = '#6892d5'/>*/}
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
                        contentContainerStyle={{paddingHorizontal: 20}}
                        data = {challenges}
                        renderItem={({item}) => Item(item)}
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
    itemView: {
      backgroundColor: "white",
      margin: 5,
      padding: 10,
      borderRadius: 10,
    }
});
