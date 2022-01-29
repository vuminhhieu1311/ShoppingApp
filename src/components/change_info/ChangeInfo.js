import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Dimensions, Alert
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import backSpecial from '../../media/appIcon/left-arrow.png';
import profileImg from '../../media/temp/user.png';
import getToken from '../../api/getToken';
import changeInfo from '../../api/changeInfo';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const urlImg = 'http://localhost/api/images/product/';

export default class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        const { name, address, phone, email, avatar } = this.props.route.params.userInfo;
        this.state = {
            txtName: name,
            txtAddress: address,
            txtPhone: phone,
            txtEmail: email,
            avatar: avatar
        };
    }
    goBackToMain() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    alertSuccess() {
        Alert.alert(
            'EClothes',
            'Change Information successfully',
            [
                { text: 'OK', onPress: this.goBackToMain.bind(this) }
            ],
            { cancelable: false }
        );
    }

    changeAccountInfo() {
        const { txtName, txtAddress, txtPhone, txtEmail, avatar } = this.state;

        getToken()
            .then(token => {
                changeInfo(JSON.parse(token), txtName, txtAddress, txtPhone, txtEmail, avatar);
            }).then((res) => {
                console.log(res);
                this.alertSuccess();
            })
            .catch(e => console.log(e));
    }

    handleImagePicker = () => {
        ImagePicker.openPicker({
        }).then(image => {
            this.setState({ avatar: image.filename });
        }).catch(e => console.log(e));
    }

    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput, profileImage, avtContainer
        } = styles;
        const { txtName, txtAddress, txtPhone, txtEmail, avatar } = this.state;

        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>User Information</Text>
                </View>
                <View style={body}>
                    <TouchableOpacity style={avtContainer} onPress={this.handleImagePicker.bind(this)}>
                        <Image source={avatar ? { uri: `${urlImg}${avatar}` } : profileImg} style={profileImage}></Image>
                    </TouchableOpacity>
                    <TextInput
                        style={textInput}
                        placeholder="Enter your name"
                        autoCapitalize="none"
                        value={txtName}
                        onChangeText={text => this.setState({ ...this.state, txtName: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your address"
                        autoCapitalize="none"
                        value={txtAddress}
                        onChangeText={text => this.setState({ ...this.state, txtAddress: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your phone number"
                        autoCapitalize="none"
                        value={txtPhone}
                        onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your email"
                        autoCapitalize="none"
                        value={txtEmail}
                        onChangeText={text => this.setState({ ...this.state, txtEmail: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity style={signInContainer} onPress={this.changeAccountInfo.bind(this)}>
                        <Text style={signInTextStyle}>CHANGE YOUR INFORMATION</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: "#E4572E",
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: width / 15,
        height: 90,
        paddingTop: 25
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



