import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchAllusers() {
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
};

export async function fetchAllChallenges(setter) {
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
            setter(challengesList);
        }
    }catch(error){
        console.log('Error al conseguir usuarios', error);
        return error;
    }
}