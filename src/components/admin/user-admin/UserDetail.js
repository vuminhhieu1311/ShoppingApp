import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Dimensions, Alert
} from 'react-native';
import backSpecial from '../../../media/appIcon/left-arrow.png';
import profileImg from '../../../media/temp/item1.png';
import getToken from '../../../api/getToken';
import changeInfo from '../../../api/changeInfo';
import changeUserStatus from '../../../api/changeUserStatus';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const urlImg = 'http://localhost/api/images/product/';

export default class UserDetail extends Component {

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    goToUserAdmin() {
        const { navigation } = this.props;
        navigation.navigate("UserAdmin");
    }

    alertSuccess() {
        Alert.alert(
            'Successfully',
            'Update successfully!',
            [
                { text: 'OK', onPress: this.goToUserAdmin.bind(this) }
            ],
            { cancelable: false }
        );
    }

    alertFail() {
        Alert.alert(
            'Unsuccessfully',
            'Error occurs while you are trying to change this information!',
            [
                { text: 'OK', onPress: this.goToUserAdmin.bind(this) }
            ],
            { cancelable: false }
        );
    }

    changeAccountInfo() {
        const { txtName, txtAddress, txtPhone, txtEmail } = this.state;
        getToken()
            .then(token => {
                changeInfo(JSON.parse(token), txtName, txtAddress, txtPhone, txtEmail);
            }).then((res) => {
                this.alertSuccess();
            })
            .catch(e => {
                console.log(e);
                this.alertFail();
            });
    }

    handleChangeUserStatus() {
        const { userInfo } = this.props.route.params;
        const status = userInfo.status == 1 ? 0 : 1;
        changeUserStatus(userInfo.id, status)
            .then(res => {
                if(res == "SUCCESSFULLY") {
                    this.alertSuccess();
                } else {
                    this.alertFail();
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput, profileImage, avtContainer
        } = styles;
        const { userInfo } = this.props.route.params;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>User Information</Text>
                </View>
                <View style={body}>
                    <View style={avtContainer}>
                        <Image source={userInfo.avatar ? { uri: `${urlImg}${userInfo.avatar}` } : profileImg} style={profileImage}></Image>
                    </View>
                    <TextInput
                        style={textInput}
                        placeholder="User ID"
                        autoCapitalize="none"
                        value={`ID${userInfo.id}`}
                        editable={false}
                        underlineColorAndroid="transparent"
                    />

                    <TextInput
                        style={textInput}
                        placeholder="Full Name"
                        autoCapitalize="none"
                        value={userInfo.name}
                        editable={false}
                        underlineColorAndroid="transparent"
                    />

                    <TextInput
                        style={textInput}
                        placeholder="Phone Number"
                        autoCapitalize="none"
                        value={userInfo.phone}
                        editable={false}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Email"
                        autoCapitalize="none"
                        value={userInfo.email}
                        editable={false}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Address"
                        autoCapitalize="none"
                        value={userInfo.address}
                        editable={false}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Address"
                        autoCapitalize="none"
                        value={`Status: ${userInfo.status == 1 ? 'Active' : 'Locked'}`}
                        editable={false}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity style={signInContainer} onPress={this.handleChangeUserStatus.bind(this)}>
                        <Text style={signInTextStyle}>{userInfo.status == 1 ? 'LOCK USER' : 'UNLOCK USER'}</Text>
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



