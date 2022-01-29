import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView
} from 'react-native';
import backSpecial from '../../media/appIcon/left-arrow.png';
import getOrderHistory from '../../api/getOrderHistory';
import getToken from '../../api/getToken';

export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { arrOrder: [] };
    }

    componentDidMount() {
        getToken()
            .then(token => {
                getOrderHistory(JSON.parse(token))
                    .then(arrOrder => this.setState({ arrOrder }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    goBackToMain() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    goToOrderDetail() {
        const { navigation } = this.props;
        navigation.navigate("OrderDetail");
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

    render() {
        const { wrapper, header, headerTitle, backIconStyle, body, orderRow, txtStyle } = styles;
        const { navigation } = this.props;
        console.log(this.state.arrOrder)
        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>Order History</Text>
                </View>

                <View style={body}>
                    <ScrollView>
                        {this.state.arrOrder ? this.state.arrOrder.map(e => (
                            <TouchableOpacity style={orderRow} key={e.id} onPress={() => {
                                navigation.navigate("OrderDetail", {
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
                        )) : <Text></Text>}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: {
        backgroundColor: "#E4572E",
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: width / 15,
        height: height/ 10,
    },

    headerTitle: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontSize: 25,
        paddingLeft: width / 15,
        paddingTop: 20,
    },

    backIconStyle: { 
        width: 30, 
        height: 30,
        marginTop: 20,
    },

    body: {
        backgroundColor: '#E8E9EB',
        flex: 1,
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
    }
});