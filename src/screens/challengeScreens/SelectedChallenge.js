import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image } from 'react-native';
import { AuthContext } from '../../database/authContext';
import { fetchAllChallInputs } from '../../database/fetchFunctions';

//Componente donde el usuario sube su participación a un reto elegido
export function SelectedChallenge({route, navigation}) {
    const { user } = useContext(AuthContext);
    const { challenge } = route.params; //objeto
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const data2 = await fetchAllChallInputs();
			const participation =
				data2.find((input) => input.reto.nombre === challenge.nombreReto 
                && input.usuario.email === user.email);
            setInput(participation);
        }
        fetch();
    }, []);

    console.log(input);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.view}>
                <ScrollView style={styles.scrollView}>
                    <View style={{margin: 20}}>
                        <Text style={{fontSize: 30, alignContent: 'center'}}>{challenge.nombreReto}</Text>

                        <Text style={{fontSize: 20, alignContent: 'justify'}}>
                            Descripción:
                        </Text>
                        <Text style={{fontSize: 20, alignContent: 'justify'}}>
                            {challenge.descripcion}
                        </Text>
                        <Text style={{marginTop: 5}}>
                            {challenge.usuario.nombreUser}
                        </Text>
                    </View>

                    <View style={{height: 2, width: '100%', backgroundColor: '#000000', marginVertical: 10}}/>
                    
                    <View style={{margin: 10}}>
                        <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}>
                            ¡Tu participación!
                        </Text>

                        <View 
                            style={{
                                backgroundColor: "#ffffff", 
                                padding: 20,
                                borderRadius: 20}}>
                            <Image source={{ uri: input.imagen }} style={styles.image}/>

                            <View 
                            style={{
                                backgroundColor: "#e6f6c5", 
                                padding: 20,
                                borderRadius: 20}}>
                                <Text style={{fontSize: 20, marginVertical: 5}}>Comentario: </Text>
                                <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}>
                                    {input.comentario}
                                </Text>
                            </View>
                        </View>
                    </View>
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
    image: {
		width: 200,
		height: 200,
		borderRadius: 30,
		margin: 10,
		padding: 10,
		alignSelf: 'center',
	},
});