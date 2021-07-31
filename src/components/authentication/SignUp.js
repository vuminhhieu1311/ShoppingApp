import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import register from '../../api/register';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: ''
        };
    }

    onSuccess() {
        Alert.alert(
            'EClothes',
            'Sign up successfully',
            [
                { text: 'OK', onPress: this.props.signIn() }
            ],
            { cancelable: false }
        );
    }

    removeEmail() {
        this.setState({ email: '' });
    }

    onFail() {
        Alert.alert(
            'EClothes',
            'Email or Phone Number has been used by others',
            [
                { text: 'OK', onPress: () => this.removeEmail.bind(this) }
            ],
            { cancelable: false }
        );
    }

    registerUser() {
        const { name, email, phone, password } = this.state;
        register(name, email, phone, password)
            .then(res => {
                if (res === 'THANH_CONG') return this.onSuccess();
                this.onFail();
            });
    }

    render() {
        const { inputStyle, loginBtn, btnText } = styles;
        return (
            <View>
                <TextInput style={inputStyle}
                    placeholder="Full name"
                    autoFocus={true}
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })} />
                <TextInput style={inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })} />
                <TextInput style={inputStyle}
                    placeholder="Phone number"
                    value={this.state.phone}
                    onChangeText={text => this.setState({ phone: text })} />
                <TextInput style={inputStyle}
                    placeholder="Password"
                    secureTextEntry={true}
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })} />
                <TextInput style={inputStyle}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    keyboardType='default'
                    value={this.state.rePassword}
                    onChangeText={text => this.setState({ rePassword: text })} />
                <TouchableOpacity style={loginBtn} onPress={this.registerUser.bind(this)}>
                    <Text style={btnText}>JOIN NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: height / 17,
        width: width * 0.8,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: height * 0.01,
        paddingLeft: 30,
        fontSize: 15,
        fontFamily: 'Avenir'
    },

    loginBtn: {
        paddingVertical: height * 0.013,
        alignItems: 'center',
        borderRadius: height * 0.01,
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
