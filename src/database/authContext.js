import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAllusers } from './fetchFunctions';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

//Llamada al contexto de la aplicación
export const AuthContext = createContext();

//Envuelve la aplicación y mantiene el contexto para los demás componentes y pantallas
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('loggedUser'); 
                if (storedUser != null) {
                setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                console.log('Error cargando usuario:', e);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    })

    const login = async (email, password) => {
        if (user != null ) {
            Alert.alert("Error", "¡Usted ya esta loggeado!", 
                [{text: "OK", onPress: () => navigation.navigate("HomeScreen")}], 
                { cancelable: false });
        } else {
            const userToLog = AsyncStorage.getItem(email);
            if (userToLog != null) {
                if (userToLog.password === password) {
                    setUser(userToLog); //Revisar que datos guardar
                    await AsyncStorage.setItem('loggedUser', JSON.stringify(userToLog));
                    Alert.alert("Exito", "¡Se ha loggeado correctamente!", 
                        [{text: "OK", onPress: () => navigation.navigate("HomeScreen")}], 
                        { cancelable: false });
                } else {
                    Alert.alert("Error", "La contraseña ingresada no es correcta");
                }
            } else {
                Alert.alert("Error","El email ingresado no esta registrado en el sistema");
            }
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('loggedUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
  );
}