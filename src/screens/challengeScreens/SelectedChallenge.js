import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Alert, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Location from 'expo-location';
import { FormInputText } from '../../components/FormInputText';
import { AuthContext } from '../../database/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/Button';
import { pickFromGallery, takePhoto } from '../../database/asyncPermissions';

//Componente donde el usuario sube su participación a un reto elegido
export function SelectedChallenge({route, navigation}) {
    const { user } = useContext(AuthContext);
    const { challenge } = route.params; //objeto 

    const {
		control,
		handleSubmit,
        setValue,
		formState: { errors },
	} = useForm();

    useEffect(() => {
        const addCurrentLocation = async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const loc = await Location.getCurrentPositionAsync({});
                setValue('location', {
                    id: Date.now().toString(),
                    lat: loc.coords.latitude,
                    long: loc.coords.longitude,
                    time: new Date().toLocaleDateString()
                })
            } else {
                Alert.alert("Permiso denegado", "Activa la ubicación para continuar."
                    [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen')}]
                );
                return;
            }
        }
        addCurrentLocation();
    }, []);

    const registerParticipation = async (input) => {
        const existe = await AsyncStorage.getItem(input.location.id);
        if (existe) {
            Alert.alert("Error", "Ya has participado en este reto.");
        }

        const extraInfo = {
            usuario: {
                email: user.email,
                nombreUser: user.nombreUser
            },
            reto: {
                nombre: challenge.nombreReto,
                puntaje: challenge.puntaje
            }
        };

        const completeInput = {
            ...input, ...extraInfo
        }

        console.log(completeInput);
        await AsyncStorage.setItem(input.location.id, JSON.stringify(completeInput));

        return {ok: true};
    }

    const onSubmit = async (data) => {
        console.log(data);
        
        try {
			await registerParticipation(data)

			Alert.alert("Exito", "Tu participación fue subida exitosamente",
				[{text: 'OK', onPress: () => navigation.navigate('HomeScreen')}]
			);
		} catch (err) {
			console.error(err);
			Alert.alert(
				'Error',
				err.message || 'No se pudo enviar tu participación.',
				[{ text: 'OK' }]
			);
		}
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.view}>
                <ScrollView style={styles.scrollView}>
                    <View style={{margin: 10}}>
                        <Text style={{fontSize: 25, alignContent: 'center'}}>{challenge.nombreReto}</Text>
                        <Text style={{fontSize: 15, alignContent: 'justify'}}>{challenge.descripcion}</Text>
                    </View>

                    <View style={{height: 2, width: '100%', backgroundColor: '#000000', marginVertical: 10}}/>
                    
                    {/*challenge.usuario.nombreUser === user.nombreUser ? (
                        <>
                            <Text style={{fontSize: 20, textAlign: 'center'}}>
                                ¿Quieres editar tu reto?
                            </Text>
                            <Button
                                btnBgColor='#6892d5'
                                btnText='Editar Reto'
                                onPress={() => navigation.navigate('RegisterChallenge', {challenge: challenge})}
                            />
                        </>
                    ) : () Evitar que los creadores participen en sus propios retos*/}
                        <>
                            <Text style={{fontSize: 25}}>
                                ¡Participa en el Reto!
                            </Text>

                            <Text style={{fontSize: 15, marginTop: 10}}>
                                ¡Agrega la imagen para probar tu reto!
                            </Text>
                            <Controller
                                control={control}
                                name='imagenComplete'
                                rules={{
                                    required: 'Una imagen es requerida',
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Button 
                                        btnBgColor="#3caf74"
                                        btnText="Elige desde la galeria" 
                                        onPress={() => pickFromGallery(onChange)} />
                                        <Button 
                                        btnBgColor="#3caf74"
                                        btnText="Toma una foto" 
                                        onPress={() => takePhoto(onChange)} />
                                        {value && <Image source={{ uri: value }} style={styles.image} />}
                                    </>
                                )}
                            />
                            {errors.imagenComplete && (
                                <Text style={styles.error}>
                                    {errors.imagenComplete.message}
                                </Text>
                            )}
                        

                            <FormInputText 
                                control={control}
                                controllerName={'comentario'}
                                patternValue={/[A-Za-z0-9]+/}
                                patterMessage='Debe ingresar un nombre válido'
                                inputPlaceHolder='Inserte un comentario'
                                errors={errors}
                            />
                        
                            <Button
                                btnBgColor='#6892d5'
                                btnText='Enviar'
                                onPress={handleSubmit(onSubmit)}
                            />
                        </>
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
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
    image: {
		width: 200,
		height: 200,
		borderRadius: 15,
		padding: 10,
		resizeMode: 'center'
	}
});