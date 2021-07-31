import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image, StyleSheet, TextInput } from 'react-native';

import icLogo from '../../media/appIcon/ic_logo.png';
import icBack from '../../media/appIcon/arrow.png';
import SignIn from './SignIn';
import SignUp from './SignUp';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignIn: true };
  }

  signIn() {
    this.setState({ isSignIn: true });
  }

  signUp() {
    this.setState({ isSignIn: false });
  }

  goBackToMain = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  goToMainAdmin = () => {
    const { navigation } = this.props;
    navigation.navigate("MainAdmin");
  }

  render() {
    const { wrapper, row1, controlStyle, logoStyle, iconStyle, signUpStyle, signInStyle,
      inactive, active } = styles;

    const mainJSX = this.state.isSignIn ? <SignIn goBackToMain={this.goBackToMain.bind(this)}
      goToMainAdmin={this.goToMainAdmin.bind(this)} /> : <SignUp signIn={this.signIn.bind(this)} />;

    return (
      <View style={wrapper}>
        <View style={row1}>
          <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
            <Image source={icBack} style={iconStyle} />
          </TouchableOpacity>
          <Image source={icLogo} style={logoStyle} />
        </View>

        {mainJSX}

        <View style={controlStyle}>
          <TouchableOpacity onPress={this.signIn.bind(this)} style={signInStyle}>
            <Text style={this.state.isSignIn ? active : inactive}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.signUp.bind(this)} style={signUpStyle}>
            <Text style={this.state.isSignIn ? inactive : active}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#E4572E",
    padding: 10,
    // marginTop: height / 26,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row1: {
    marginTop: height / 25,
    flexDirection: 'row',
  },

  logoStyle: {
    height: height / 21,
    width: width * 0.5,
    marginRight: width / 8
  },

  iconStyle: {
    width: width / 10,
    height: height / 24,
    marginRight: width / 10,
  },

  row2: {
    flexDirection: 'row',
  },

  controlStyle: {
    flexDirection: 'row',
    width: 300,
    marginBottom: height / 30
  },

  signInStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    flex: 1,
    borderBottomLeftRadius: height * 0.01,
    borderTopLeftRadius: height * 0.01,
    marginRight: 1,
  },

  signUpStyle: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
    borderBottomRightRadius: height * 0.01,
    borderTopRightRadius: height * 0.01,
    marginLeft: 1
  },

  active: {
    color: '#E4572E',
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },

  inactive: {
    color: '#BBBCB6',
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },

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
})

