import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import signIn from '../../api/signIn';
import global from '../global';
import saveToken from '../../api/saveToken';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onFail() {
        Alert.alert(
            'EClothes',
            'Email or Password is incorrect',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    onSignIn() {
        const { email, password } = this.state;
        if (email == "1" && password == "1") {
            this.props.goToMainAdmin();
            this.setState({
                email: '',
                password: ''
            })
        } else {
            signIn(email, password)
                .then(res => {
                    global.onSignIn(res.user);
                    this.props.goBackToMain();
                    saveToken(res.token);
                })
                .catch(err => {
                    console.log(err);
                    this.onFail();
                });
        }
    }

    render() {
        const { inputStyle, loginBtn, btnText } = styles;
        const { email, password } = this.state;
        return (
            <View>
                <TextInput style={inputStyle}
                    placeholder="Email"
                    autoFocus={true}
                    value={email}
                    onChangeText={text => this.setState({ email: text })} />
                <TextInput style={inputStyle}
                    placeholder="Password"
                    secureTextEntry={true}
                    keyboardType='default'
                    value={password}
                    onChangeText={text => this.setState({ password: text })} />
                <TouchableOpacity style={loginBtn}>
                    <Text style={btnText} onPress={this.onSignIn.bind(this)}>SIGN IN NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 55,
        width: width * 0.8,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 15,
        paddingLeft: 30,
        fontSize: 15
    },

    loginBtn: {
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 1,
        borderColor: '#fff',
        borderWidth: 1
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        fontSize: 20
    }
});
