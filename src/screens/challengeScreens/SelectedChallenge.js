import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Location from 'expo-location';

//Componente donde el usuario sube su participación a un reto elegido
export function SelectedChallenge({route, navigation}) {
    const { challenge } = route.params; //objeto 
    const [locations, setLocations] = useState([]);

    //Añadir ubicación a la lista locations
    const addCurrentLocation = async () => {
        //Pedido de permiso para ver ubicación
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status !== 'granted') {
            Alert.alert("Permiso denegado", "Activa la ubicación para continuar.");
            return;
        }

        //Obtener y añadir ubicación
        const loc = await Location.getCurrentPositionAsync({});
        const entry = {
            id: Date.now().toString(),
            lat: loc.coords.latitude.toFixed(5),
            long: loc.coords.longitude.toFixed(5),
            time: new Date().toLocaleTimeString()
        };
        setLocations([entry, ...locations]);
    }

    return (
        <SafeAreaView>
            <View>
                <ScrollView>
                    {/*Insert something.*/}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}