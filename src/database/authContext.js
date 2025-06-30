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
	}, []);

	//Quitar luego, solo a modo de prueba
	const clearStorage = async () => {
		await AsyncStorage.clear();
	};

	const login = async (email, password) => {
		if (user != null) {
			//Si ya hay un usuario loggeado automaticamente
			return { ok: false, message: 'Usted ya esta loggeado a la app.' };
		} else {
			const userPromise = await AsyncStorage.getItem(email);
			const userToLog = JSON.parse(userPromise);

			if (userToLog != null) {
				console.log('userToLog es: ', userToLog);

				if (userToLog.contrasenia === password) {
					setUser(userToLog);
					AsyncStorage.setItem(
						'loggedUser',
						JSON.stringify(userToLog)
					);

					return {
						ok: true,
						message: '¡Usuario ingresado exitosamente!',
					};
				} else {
					return {
						ok: false,
						message: 'La contraseña ingresada no es correcta.',
					};
				}
			} else {
				return {
					ok: false,
					message: 'Usted no esta registrado en el sistema.',
				};
			}
		}
	};

	const logout = async () => {
		setUser(null);
		await AsyncStorage.removeItem('loggedUser');
	};

	return (
		<AuthContext.Provider
			value={{ user, login, logout, loading, clearStorage }}
		>
			{children}
			{/*Todos los componentes dentro de AuthProvider, ver App.js*/}
		</AuthContext.Provider>
	);
};
