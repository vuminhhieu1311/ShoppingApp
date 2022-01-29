import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import profileImg from '../../media/temp/profile.png';
import global from '../global';
import removeToken from '../../api/removeToken';
const { width, height } = Dimensions.get('window');
const urlImg = 'http://localhost/api/images/product/';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
        global.onSignIn = this.onSignIn.bind(this);
    }

    openAuthentication = () => {
        const { navigation } = this.props;
        navigation.navigate("Authentication");
    } // Open the authentication screen

    openOrderHistory = () => {
        const { navigation } = this.props;
        navigation.navigate("OrderHistory");
    } // Open the order history screen
    onSignIn(user) {
        this.setState({ user });
    }
    onSignOut() {
        this.setState({user: null})
        removeToken();
    }

    render() {
        const { wrapper, btn, profileImage, btnText, txtUserName, loginWrapper } = styles;
        const { user } = this.state;
        const avatar = user ? user.avatar : null;
        const logoutJSX = (
            <View>
                <TouchableOpacity style={btn} onPress={this.openAuthentication.bind(this)}>
                    <Text style={btnText}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        );
        const loginJSX = (
            <View style={loginWrapper}>
                <Text style={txtUserName}>{user ? user.name : ''}</Text>
                <View>
                    <TouchableOpacity style={btn} onPress={this.openOrderHistory.bind(this)}>
                        <Text style={btnText}>ORDER HISTORY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btn} onPress={ () => {
                         const { navigation } = this.props;
                         navigation.navigate("ChangeInfo", {
                             userInfo: user
                         });
                    }}>
                        <Text style={btnText}>CHANGE INFO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btn} onPress={this.onSignOut.bind(this)}>
                        <Text style={btnText}>SIGN OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

        const mainJSX = this.state.user ? loginJSX : logoutJSX;
        return (
            <View style={wrapper}>
                
                <Image source={avatar ? { uri: `${urlImg}${avatar}` } : profileImg} style={profileImage}></Image>
                {mainJSX}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // marginTop: height / 25,
        backgroundColor: '#E4572E',
        borderRightWidth: 3,
        borderColor: '#fff',
        alignItems: 'center',
    },

    loginWrapper: {
        alignItems: 'center',
        flex: 1
    },

    btn: {
        width: width / 2,
        height: 50,
        backgroundColor: '#fff',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        fontWeight: 'bold',
        borderRadius: 10,
        marginBottom: height / 35
    },
    btnText: {
        color: '#E4572E',
        fontWeight: 'bold',
        fontSize: 15
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: height / 40,
        marginTop: height / 20
    },
    txtUserName: {
        color: '#fff',
        fontFamily: 'Avenir',
        fontSize: 25,
        marginBottom: height / 20
    }
})

