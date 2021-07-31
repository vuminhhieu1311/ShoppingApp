import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import profileImg from '../../../media/temp/profile.png';
import global from '../../global';
import removeToken from '../../../api/removeToken';
const { width, height } = Dimensions.get('window');

export default class MenuAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: true
        };
    }

    openAuthentication = () => {
        const { navigation } = this.props;
        navigation.navigate("Authentication");
    } // Open the authentication screen

    openAddNewProduct = () => {
        const { navigation } = this.props;
        navigation.navigate("AddNewProduct");
    }

    onSignOut() {
        this.setState({isSignedIn: false})
        removeToken();
    }

    openUserAdmin() {
        const { navigation } = this.props;
        navigation.navigate("UserAdmin");
    }

    render() {
        const { wrapper, btn, profileImage, btnText, txtUserName, loginWrapper } = styles;
        const logoutJSX = (
            <View>
                <TouchableOpacity style={btn} onPress={this.openAuthentication.bind(this)}>
                    <Text style={btnText}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        );
        const loginJSX = (
            <View style={loginWrapper}>
                <Text style={txtUserName}>Admin</Text>
                <View>
                    <TouchableOpacity style={btn} onPress={this.openAddNewProduct.bind(this)}>
                        <Text style={btnText}>ADD PRODUCT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btn} onPress={this.openUserAdmin.bind(this)}>
                        <Text style={btnText}>USER ACCOUNTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btn} onPress={this.onSignOut.bind(this)}>
                        <Text style={btnText}>SIGN OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

        const mainJSX = this.state.isSignedIn ? loginJSX : logoutJSX;
        return (
            <View style={wrapper}>
                <Image source={profileImg} style={profileImage}></Image>
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

