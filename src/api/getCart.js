import AsyncStorage from '@react-native-async-storage/async-storage';

const getCart = async () => {
    try {
        const cartArray = await AsyncStorage.getItem('@AAA:key');
        if(cartArray != null) {
            return JSON.parse(cartArray); // chuyen ve mang object
        }
        return [];
    } catch(error) {
        return [];
    }
}

export default getCart;