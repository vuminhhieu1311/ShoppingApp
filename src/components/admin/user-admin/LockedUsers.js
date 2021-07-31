import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import profileImg from '../../../media/temp/item1.png';

const { height, width } = Dimensions.get('window');
const urlImg = 'http://localhost/api/images/product/';

export default class LockedUsers extends Component {

    render() {
        
        const { lockedUsers, navigation } = this.props;
        const { itemStyle, itemInfo, itemImg, itemName, txtPrice, txtMaterial } = styles;
        return (
            
            <ScrollView>
                {lockedUsers ? lockedUsers.map(user => (
                    <TouchableOpacity key={user.id} style={itemStyle}
                        onPress={() => {
                            navigation.navigate("UserDetail", {
                                userInfo: user
                            });
                        }}>

                        <Image source={user.avatar ? { uri: `${urlImg}${user.avatar}` } : profileImg} style={itemImg} />
                        <View style={itemInfo}>
                            <Text style={itemName}>{user.name}</Text>
                            <Text style={txtPrice}>ID{user.id} - {user.status == 1 ? 'Active' : 'Locked'}</Text>
                            <Text style={txtMaterial}>{user.email}</Text>
                            <Text style={txtMaterial}>{user.phone}</Text>
                            <Text style={txtMaterial}>{user.address}</Text>
                        </View>

                    </TouchableOpacity>
                )) : <Text></Text>}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#E8E9EB',
        flex: 1,
    },
    itemStyle: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#BBBCB6'
    },

    itemInfo: {
        paddingLeft: 10,
        width: width * 0.7,
        justifyContent: 'space-between'
    },

    itemImg: {
        width: width * 0.3,
        height: width * 0.3
    },
    itemName: {
        color: '#1b262c',
        fontSize: 20,
        fontFamily: 'Avenir',
    },

    txtPrice: {
        color: '#E4572E',
        paddingLeft: 7
    },

    txtMaterial: {
        color: '#746D69',
        fontSize: 16,
        fontFamily: 'Avenir',
        paddingLeft: 7
    }
})
