import  AsyncStorage  from '@react-native-async-storage/async-storage';

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem("@CCC:key", JSON.stringify(token));
    } catch (e) {
        console.log(e);
    }
}

export default saveToken;