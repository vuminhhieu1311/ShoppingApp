import React, { Component } from 'react';
import { } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from './authentication/Authentication';
import ChangeInfo from './change_info/ChangeInfo';
import Main from './main/Main';
import OrderHistory from './order_history/OrderHistory';
import ListCategory from './main/shop/list_category/ListCategory';
import ProductDetail from './main/shop/product_detail/ProductDetail';
import MainAdmin from './admin/main-admin/MainAdmin';
import ProductDetailAdmin from './admin/product-admin/ProductDetailAdmin';
import ListCategoryAdmin from './admin/product-admin/ListCategoryAdmin';
import OrderDetail from './order_history/OrderDetail';
import Order from './main/shop/cart/Order';
import AddNewProduct from './admin/product-admin/AddNewProduct';
import UserAdmin from './admin/user-admin/UserAdmin';
import UserDetail from './admin/user-admin/UserDetail';
import OrderDetailAdmin from './admin/order-admin/OrderDetailAdmin';
import OrderRating from './order_history/OrderRating';
import ProductReviewAdmin from './admin/product-admin/ProductReviewAdmin';
const Stack = createStackNavigator();

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode='none'>
                    <Stack.Screen name='Main' component={Main}></Stack.Screen>
                    <Stack.Screen name='Authentication' component={Authentication}></Stack.Screen>
                    <Stack.Screen name='ListCategory' component={ListCategory}></Stack.Screen>
                    <Stack.Screen name='OrderHistory' component={OrderHistory}></Stack.Screen>
                    <Stack.Screen name='ChangeInfo' component={ChangeInfo}></Stack.Screen>
                    <Stack.Screen name='ProductDetail' component={ProductDetail}></Stack.Screen>
                    <Stack.Screen name='OrderDetail' component={OrderDetail}></Stack.Screen>
                    <Stack.Screen name='MainAdmin' component={MainAdmin}></Stack.Screen>
                    <Stack.Screen name='ShopAdmin' component={MainAdmin}></Stack.Screen>
                    <Stack.Screen name='ProductDetailAdmin' component={ProductDetailAdmin}></Stack.Screen>
                    <Stack.Screen name='ListCategoryAdmin' component={ListCategoryAdmin}></Stack.Screen>
                    <Stack.Screen name='AddNewProduct' component={AddNewProduct}></Stack.Screen>
                    <Stack.Screen name='UserAdmin' component={UserAdmin}></Stack.Screen>
                    <Stack.Screen name='Order' component={Order}></Stack.Screen>
                    <Stack.Screen name='UserDetail' component={UserDetail}></Stack.Screen>
                    <Stack.Screen name='OrderDetailAdmin' component={OrderDetailAdmin}></Stack.Screen>
                    <Stack.Screen name='OrderRating' component={OrderRating}></Stack.Screen>
                    <Stack.Screen name='ProductReviewAdmin' component={ProductReviewAdmin}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer >
        )
    }   
}

