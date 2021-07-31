import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem("@CCC:key");
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        return '';
    }
};

export default getToken;