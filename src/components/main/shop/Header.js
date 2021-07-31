import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, Image, StyleSheet, TextInput } from 'react-native';

import icMenu from '../../../media/appIcon/ic_menu.png';
import icLogo from '../../../media/appIcon/ic_logo.png';
import icSearch from '../../../media/appIcon/ic_search.png';
import global from '../../global';
import searchProduct from '../../../api/searchProduct';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    onSearch() {
        const {searchText} = this.state;
        searchProduct(searchText)
            .then(arrProduct => {
                global.setArraySearch(arrProduct)
            })
            .catch(e => console.log.e);
    }

    render() {
        const { wrapper, row1, searchText, logoStyle, iconStyle, row2, searchIcon } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.props.onOpen}>
                        <Image source={icMenu} style={iconStyle} />
                    </TouchableOpacity>
                    <Image source={icLogo} style={logoStyle} />
                </View>
                <View style={row2}>
                    <TextInput
                        style={searchText}
                        placeholder="Search"
                        underlineColorAndroid="transparent"
                        onFocus={() => global.goToSearch()}
                        value={this.state.searchText}
                        onChangeText={(text) => {
                            this.setState({ searchText: text })}}
                        onSubmitEditing={this.onSearch.bind(this)}
                    />
                    <TouchableOpacity onPress={this.onSearch.bind(this)}>
                        <Image source={icSearch} style={searchIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: height / 6.5,
        backgroundColor: "#E4572E",
        padding: 10,
        justifyContent: 'space-between',
        paddingTop: height / 25
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchText: {
        height: height / 24,
        width: width * 0.81,
        backgroundColor: '#FFF',
        paddingLeft: 10,
        fontFamily: 'Avenir',
        paddingVertical: 0
    },
    logoStyle: {
        height: height / 21,
        width: width * 0.5
    },
    iconStyle: {
        width: width / 10,
        height: height / 24
    },
    searchIcon: {
        marginLeft: width * 0.03,
        width: width / 10,
        height: height / 24
    },
    row2: {
        flexDirection: 'row',
    }
})