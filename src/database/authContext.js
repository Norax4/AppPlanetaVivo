import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Llamada al contexto de la aplicación
export const AuthContext = createContext();

//Envuelve la aplicación y mantiene el contexto para los demás componentes y pantallas
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('loggedUser'); 
                if (storedUser) {
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

    const login = async (username, password,) => {
        if (username === 'admin' && password === '1234') {
            const userData = { username };
            setUser(userData);
            await AsyncStorage.setItem('loggedUser', JSON.stringify(userData));
        } else {
            alert('Credenciales inválidas');
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