import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCart = async(cartArray) => {
    try {
        await AsyncStorage.setItem("@AAA:key", JSON.stringify(cartArray));
    } catch (e) {
        console.log(e);
    }
}

export default saveCart;
