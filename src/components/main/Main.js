import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import Menu from './Menu';
import Shop from './shop/Shop';
import checkLogin from '../../api/checkLogin';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import getToken from '../../api/getToken';

export default class Main extends Component {


    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                tapToClose={true}
                openDrawerOffset={0.4}
                content={
                    <Menu navigation={this.props.navigation} />
                }
            >
                <Shop open={this.openControlPanel.bind(this)}
                    navigation={this.props.navigation}
                />
            </Drawer>
        )
    }
}
