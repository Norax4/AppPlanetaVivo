import { StyleSheet, View, SafeAreaView, ScrollView, Text, FlatList} from 'react-native';

import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import { fetchAllChallenges } from '../../database/fetchFunctions';

export function ChallengesList({ navigation }) {
	const [challenges, setChallenges] = useState([]);

	useEffect(() => {
        fetchAllChallenges(setChallenges);
	}, []);

    const Item = ({object}) => {
        return (
        <View key={object.nombreReto} style={styles.itemView} >
            <Text>{object.nombreReto}</Text>
            <Button 
            onPress={() => navigation.navigate('SelectedChallenge', {challenge: object})}
            btnText={object.nombreReto} 
            btnBgColor = '#6892d5'/>
        </View>
    )}

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
                        renderItem={({item}) => <Item object = {item} />}
                        keyExtractor={item => item.nombreReto}
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
        backgroundColor: '#fbfffe',
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});
