import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, FlatList, RefreshControl, ScrollView } from 'react-native';

import backIcon from '../../../media/appIcon/left-arrow.png';
import getListProduct from '../../../api/getListProduct';
import getOrderByStatus from '../../../api/getOrderByStatus';
import getOrders from '../../../api/getOrders';
import global from '../../global';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const urlImg = 'http://localhost/api/images/product/';


export default class OrderAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: this.props.orderList,
            status: 3,
        };
        global.refreshOrders = this.refreshOrders.bind(this);
    }

    openProductDetail = () => {
        const { navigation } = this.props;
        navigation.navigate("ProductDetail");
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    showPendingOrders() {
        this.setState({ status: 0 });
        getOrderByStatus(0)
            .then(res => {
                this.setState({ orderList: res });
            })
            .catch(e => console.log(e));
    }

    showCompletedOrders() {
        this.setState({ status: 1 });
        getOrderByStatus(1)
            .then(res => {
                this.setState({ orderList: res });
            })
            .catch(e => console.log(e));
    }

    showCancelledOrders() {
        this.setState({ status: 2 });
        getOrderByStatus(2)
            .then(res => {
                this.setState({ orderList: res });
            })
            .catch(e => console.log(e));
    }

    endRefresh() {
        const { id } = this.props.route.params.type;
        getListProduct(id, this.state.page + 1)
            .then(arrProduct => {
                this.setState({
                    listProducts: this.state.listProducts.concat(arrProduct),
                    refresh: false
                });
                console.log(this.state.listProducts);
            })
            .catch((e) => { console.log(e) });
    }

    checkStatus(status) {
        if (status == "0") {
            return "Pending";
        } else if (status == "1") {
            return "Completed";
        } else {
            return "Cancelled";
        }
    }

    refreshOrders() {
        getOrders()
            .then(res => this.setState({ orderList: res }))
            .catch(e => console.log(e));
    }

    render() {
        const { wrapper, header, title, categories, btnCategory, txtCategory,
            activeCategory, orderRow, txtStyle, itemImg, itemName, txtPrice, txtMaterial } = styles;
        const { status, orderList } = this.state;
        const { navigation } = this.props;
        return (
            <View style={wrapper}>
                <View style={categories}>
                    <TouchableOpacity style={status == 0 ? activeCategory : btnCategory}
                        onPress={this.showPendingOrders.bind(this)}>
                        <Text style={txtCategory}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={status == 1 ? activeCategory : btnCategory}
                        onPress={this.showCompletedOrders.bind(this)}>
                        <Text style={txtCategory}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={status == 2 ? activeCategory : btnCategory}
                        onPress={this.showCancelledOrders.bind(this)}>
                        <Text style={txtCategory}>Cancelled</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {orderList.map(e => (
                        <TouchableOpacity style={orderRow} key={e.id} onPress={() => {
                            navigation.navigate("OrderDetailAdmin", {
                                orderId: e.id
                            });
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={txtStyle}>Order Id:</Text>
                                <Text style={{ color: '#9A9A9A' }}>ORD{e.id}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={txtStyle}>Order Time:</Text>
                                <Text style={{ color: '#9A9A9A' }}>{e.date_order}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={txtStyle}>Status:</Text>
                                <Text style={{ color: '#E4572E' }}>{this.checkStatus(e.status)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={txtStyle}>Total:</Text>
                                <Text style={{ color: '#E4572E', fontWeight: 'bold' }}>${e.total}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#E8E9EB'
    },

    deleteIcon: {
        height: 20,
        width: 20
    },

    header: {
        paddingTop: height / 26,
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#CCCDC6',
        borderBottomWidth: 1,
        backgroundColor: '#E4572E'
    },

    title: {
        fontFamily: 'Avenir',
        fontSize: 25,
        paddingLeft: 10,
        color: '#fff'
    },

    orderRow: {
        height: width / 3,
        backgroundColor: '#FFF',
        marginTop: 10,
        marginHorizontal: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 15,
        borderRadius: 2,
        justifyContent: 'space-around'
    },
    txtStyle: {
        color: '#9A9A9A',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Avenir'
    },

    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 6,
        paddingTop: 14
    },

    btnCategory: {
        width: width / 3.5,
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderColor: '#E4572E',
    },

    txtCategory: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: '#E4572E',
        fontSize: 18,
    },

    activeCategory: {
        borderWidth: 1,
        width: width / 3.5,
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderColor: '#E4572E',
    },

    itemStyle: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#BBBCB6'
    },

    itemInfo: {
        paddingLeft: 10,
        width: width * 0.7,
        justifyContent: 'space-between'
    },

    itemImg: {
        width: width * 0.3,
        height: width * 0.3
    },
    itemName: {
        color: '#1b262c',
        fontSize: 20,
        fontFamily: 'Avenir',
    },

    txtPrice: {
        color: '#E4572E',
        paddingLeft: 7
    },

    txtMaterial: {
        color: '#746D69',
        fontSize: 16,
        fontFamily: 'Avenir',
        paddingLeft: 7
    }

})

