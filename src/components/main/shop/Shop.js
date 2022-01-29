import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Home from './home/Home';
import Cart from './cart/Cart';
import Search from './search/Search';
import Contact from './contact/Contact';
import Header from './Header';
import global from '../../global';
import initData from '../../../api/initData';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';
import checkLogin from '../../../api/checkLogin';
import getToken from '../../../api/getToken';

import icHome from '../../../media/appIcon/ic_home.png';
import icHome0 from '../../../media/appIcon/ic_home0.png';
import icCart from '../../../media/appIcon/ic_cart.png';
import icCart0 from '../../../media/appIcon/ic_cart0.png';
import icSearch from '../../../media/appIcon/search.png';
import icSearch0 from '../../../media/appIcon/search0.png';
import icMe from '../../../media/appIcon/ic_me.png';
import icMe0 from '../../../media/appIcon/ic_me0.png';

const { height } = Dimensions.get('window');

export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home",
            types: [],
            topProducts: [],
            cartArray: []
        };
        global.addItemToCart = this.addProductToCart.bind(this);
        global.incrQuantity = this.incrQuantity.bind(this);
        global.decrQuantity = this.decrQuantity.bind(this);
        global.removeItem = this.removeItem.bind(this);
        global.goToSearch = this.goToSearch.bind(this);
        global.resetCart = this.resetCart.bind(this);
        global.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        StatusBar.setHidden(false);
        initData().then(resJSON => {
            const { type, product } = resJSON;
            this.setState({ types: type, topProducts: product });
        });
        // Lay cartArray tu AsyncStorage
        getCart().then(cartArray => this.setState({ cartArray }));

        getToken()
            .then(token => {
                console.log(token)
                checkLogin(JSON.parse(token))
                    .then(res => global.onSignIn(res.user));
            });
    }

    refreshData() {
        initData().then(resJSON => {
            const { type, product } = resJSON;
            this.setState({ types: type, topProducts: product });
        });
    }

    goToSearch() {
        this.setState({ selectedTab: 'search' });
    }

    addProductToCart(product) {
        // check whether the product is already on cart
        const isExist = this.state.cartArray.some(e => e.product.id === product.id);
        if (isExist) {
            const newCart = this.state.cartArray.map(e => {
                if (e.product.id !== product.id) return e;
                return { product: e.product, quantity: e.quantity + 1 };
            });
            this.setState({ cartArray: newCart },
                () => saveCart(this.state.cartArray)
            );
        } else {
            this.setState({ cartArray: this.state.cartArray.concat({ product, quantity: 1 }) },
                () => saveCart(this.state.cartArray));
            // add a product to cart array
        }

    }

    resetCart() {
        this.setState({ cartArray: [] },
            () => saveCart(this.state.cartArray)
        );
    }

    // Increase the quantity of an item in the cart
    incrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            return { product: e.product, quantity: e.quantity + 1 };
        });
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }
    // Decrease the quantity of an item in the cart
    decrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            return { product: e.product, quantity: e.quantity - 1 };
        });
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }

    removeItem(productId) {
        const newCart = this.state.cartArray.filter(e =>
            e.product.id !== productId);
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }

    openMenu() {
        const { open } = this.props;
        open();
    } // Open the menu

    render() {
        const { wrapper, tabBarStyle, titleStyle, selectedTitleStyle } = styles;
        const { types, selectedTab, topProducts, cartArray } = this.state;
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
                        <Home navigation={navigation}
                            types={types}
                            topProducts={topProducts} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'myCart'}
                        title='My Cart'
                        renderIcon={() => <Image source={icCart} />}
                        renderSelectedIcon={() => <Image source={icCart0} />}
                        badgeText={cartArray.length}
                        onPress={() => this.setState({
                            selectedTab: 'myCart'
                        })}>
                        <Cart navigation={navigation}
                            cartArray={cartArray} />
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
                        <Search navigation={navigation} />
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
        // marginTop: height / 25
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
