import  AsyncStorage  from '@react-native-async-storage/async-storage';

const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@CCC:key')
    } catch(e) {
      console.log(e);
    }
  
    console.log('Done.')
  }

export default removeToken;