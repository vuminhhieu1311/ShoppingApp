import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeAdmin from './HomeAdmin';
import Contact from '../../main/shop/contact/Contact';
import Header from '../../main/shop/Header';
import global from '../../global';
import initData from '../../../api/initData';
import icHome from '../../../media/appIcon/ic_home.png';
import icHome0 from '../../../media/appIcon/ic_home0.png';
import icSearch from '../../../media/appIcon/search.png';
import icSearch0 from '../../../media/appIcon/search0.png';
import icMe from '../../../media/appIcon/ic_me.png';
import icMe0 from '../../../media/appIcon/ic_me0.png';
import icOrder from '../../../media/appIcon/order.png';
import icOrder0 from '../../../media/appIcon/order0.png';
import SearchAdmin from './SearchAdmin';
import OrderAdmin from '../order-admin/OrderAdmin';
import getOrders from '../../../api/getOrders';

const { height } = Dimensions.get('window');

export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home",
            types: [],
            topProducts: [],
            orderList: []
        };
        global.goToSearch = this.goToSearch.bind(this);
        global.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        StatusBar.setHidden(false);
        initData().then(resJSON => {
            const { type, product } = resJSON;
            this.setState({ types: type, topProducts: product });
        });

        getOrders()
            .then(res => this.setState({ orderList: res }))
            .catch(e => console.log(e));
    }

    goToSearch() {
        this.setState({ selectedTab: 'search' });
    }

    openMenu() {
        const { open } = this.props;
        open();
    } // Open the menu

    refreshData() {
        initData().then(resJSON => {
            const { type, product } = resJSON;
            this.setState({ types: type, topProducts: product });
        });
    }

    render() {
        const { wrapper, tabBarStyle, titleStyle, selectedTitleStyle } = styles;
        const { types, selectedTab, topProducts, orderList } = this.state;
        const { navigation } = this.props;
        return (
            <View style={wrapper}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"></StatusBar>
                <Header onOpen={this.openMenu.bind(this)}></Header>

                <TabNavigator tabBarStyle={tabBarStyle}>
                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'home'}
                        title='Home'
                        renderIcon={() => <Image source={icHome} />}
                        renderSelectedIcon={() => <Image source={icHome0} />}
                        onPress={() => this.setState({
                            selectedTab: 'home'
                        })}>
                        <HomeAdmin navigation={navigation}
                            types={types}
                            topProducts={topProducts} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'search'}
                        title='Search'
                        renderIcon={() => <Image source={icSearch} />}
                        renderSelectedIcon={() => <Image source={icSearch0} />}
                        onPress={() => this.setState({
                            selectedTab: 'search'
                        })}>
                        <SearchAdmin navigation={navigation} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'order'}
                        renderIcon={() => <Image source={icOrder} />}
                        renderSelectedIcon={() => <Image source={icOrder0} />}
                        title='Orders'
                        onPress={() => this.setState({
                            selectedTab: 'order'
                        })}>
                        <OrderAdmin navigation={navigation}
                            orderList={orderList} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'contact'}
                        renderIcon={() => <Image source={icMe} />}
                        renderSelectedIcon={() => <Image source={icMe0} />}
                        title='Contact'
                        onPress={() => this.setState({
                            selectedTab: 'contact'
                        })}>
                        <Contact />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    tabBarStyle: {
        height: height / 13,
        backgroundColor: "#fff"
    },
    titleStyle: {
        color: '#E3C3C3',
        fontFamily: 'Avenir',
        fontSize: 15
    },
    selectedTitleStyle: {
        color: '#e4572e',
        fontFamily: 'Avenir'
    }
})
