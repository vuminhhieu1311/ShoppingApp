import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Dimensions, Alert
} from 'react-native';
import profileImg from '../../../media/temp/item1.png';
import register from '../../../api/register';
import global from '../../global';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtName: '',
            txtPhone: '',
            txtEmail: '',
            txtPass: '',
            txtConfirmPass: '',
        };
    }

    resetState() {
        this.setState({ txtName: '' });
        this.setState({ txtPhone: '' });
        this.setState({ txtEmail: '' });
        this.setState({ txtPass: '' });
        this.setState({ txtConfirmPass: '' });
    }
    
    onSuccess() {
        Alert.alert(
            'Successfully',
            'You have created a new user!',
            [
                { text: 'OK', onPress: () => {
                    global.goToAllUsers();
                    global.refreshUser();
                } }
            ],
            { cancelable: false }
        );
    }

    onFail() {
        Alert.alert(
            'Unsuccessfully',
            'Error occurs while you are trying to create a new user!',
            [
                { text: 'OK', onPress: this.resetState.bind(this) }
            ],
            { cancelable: false }
        );
    }

    handleAddUser() {
        const { txtName, txtPhone, txtEmail, txtPass, txtConfirmPass } = this.state;
        if(txtPass != txtConfirmPass) {
            return this.onFail();
        }

        register(txtName, txtEmail, txtPhone, txtPass)
            .then(res => {
                if (res === 'THANH_CONG') return this.onSuccess();
                this.onFail();
            })
            .catch(e => console.log(e));
    }

    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput, profileImage, avtContainer
        } = styles;
        const { txtName, txtEmail, txtPass, txtPhone, txtConfirmPass } = this.state;
        return (
            <View style={wrapper}>

                <View style={body}>
                    <View style={avtContainer}>
                        <Image source={profileImg} style={profileImage}></Image>
                    </View>

                    <TextInput
                        style={textInput}
                        placeholder="Full Name"
                        autoCapitalize="none"
                        value={txtName}
                        onChangeText={text => this.setState({ ...this.state, txtName: text })}
                        underlineColorAndroid="transparent"
                    />

                    <TextInput
                        style={textInput}
                        placeholder="Phone Number"
                        autoCapitalize="none"
                        value={txtPhone}
                        onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Email"
                        autoCapitalize="none"
                        value={txtEmail}
                        onChangeText={text => this.setState({ ...this.state, txtEmail: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Password"
                        autoCapitalize="none"
                        value={txtPass}
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ ...this.state, txtPass: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        value={txtConfirmPass}
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ ...this.state, txtConfirmPass: text })}
                        underlineColorAndroid="transparent"
                    />

                    <TouchableOpacity style={signInContainer} onPress={this.handleAddUser.bind(this)}>
                        <Text style={signInTextStyle}>ADD USER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: "#E4572E",
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: width / 15,
        paddingTop: height / 65,
        height: height / 9
    },
    headerTitle: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontSize: 25,
        paddingLeft: width / 15
    },
    backIconStyle: { width: 30, height: 30 },
    body: {
        backgroundColor: '#F6F6F6',
    },
    avtContainer: {
        alignItems: 'center'
    },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#E4572E',
        borderWidth: 1,
        fontSize: 18
    },
    signInTextStyle: {
        color: '#FFF',
        fontFamily: 'Avenir',
        fontWeight: '500',
        paddingHorizontal: 20,
        fontSize: 18
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#E4572E',
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    },
    profileImage: {
        width: width / 2,
        height: width / 2,
        borderRadius: width / 4,
        marginBottom: height / 40,
        marginTop: height / 20,
        borderWidth: 1,
        borderColor: "#E4572E"
    },
});



