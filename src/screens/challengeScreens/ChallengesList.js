import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';

import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { fetchAllChallenges } from '../../database/fetchFunctions';

export function ChallengesList({navigation}) {
    
    const [challenges, setChallenges]= useState([]);

    useEffect(() =>{
        fetchAllChallenges(); //manejar setting de la lista
        
    }, [])

    const listItemView = (item) => {
        <View>
            <Text>
                <Button title="Participar" 
                onPress={() => navigation.navigate('SelectedChallenge', {item})}/>
            </Text>
        </View>
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View>
                <View>
                    <FlatList 
                    
                    />
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