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
            if (key.indexOf("???") !== -1) {
                return { key, value };
            }
        });

        return challenges;
    }catch(error){
        console.log('Error al conseguir usuarios', error);
        return error;
    }
}