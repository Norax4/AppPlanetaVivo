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

export async function fetchAllChallenges() {
    try{
        const keys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(keys);
        const challenges = data.map(([key, value]) => {
            if (value.indexOf("nombreReto") !== -1) {
                return { key, value };
            }
        });
        console.log(challenges);
        /*if (challenges.length > 0){
            return {ok: true, content: challenges};
        } else {
            return {ok: false, content: "¡No hay retos en este momento!"};
        }*/
    }catch(error){
        console.log('Error al conseguir usuarios', error);
        return error;
    }
}