import AsyncStorage from '@react-native-async-storage/async-storage';

/*export async function fetchAllusers() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(keys);
        const users = data.map(([key, value]) => {
            if (key.indexOf("@") !== -1) {
                return { key, value };
            }
        });
        if (users.length > 0) {
            return {ok: true, content: users};
        } else {
            return {ok: false, content: "¡No se encontraron usuarios!"};
        }
        
    } catch(error) {
        console('Error al conseguir usuarios:', error)
        return error;
    }
};*/

export async function fetchAllChallenges() {
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
                
        if (challengesList.length > 0) {
            return challengesList;
        }
    }catch(error){
        console.log('Error al conseguir retos', error);
        return error;
    }
}

export async function fetchAllChallInputs() {
    try{
        const keys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(keys);
        const inputList = data.map(([key, value]) => {
            try {
                return JSON.parse(value);
                } catch (e) {
                // Si no es un JSON válido, se ignora
                return null;
                }
            })
            .filter(item => item && item.ubicacion);
                
        if (inputList.length > 0) {
            return inputList;
        }
    }catch(error){
        console.log('Error al conseguir usuarios', error);
        return error;
    }
}