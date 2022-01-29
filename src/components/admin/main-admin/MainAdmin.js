import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import MenuAdmin from './MenuAdmin';
import ShopAdmin from '../shop-admin/ShopAdmin';

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
                    <MenuAdmin navigation={this.props.navigation} />
                }
            >
                <ShopAdmin open={this.openControlPanel.bind(this)}
                    navigation={this.props.navigation}
                />
            </Drawer>
        )
    }
}
