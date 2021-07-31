import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView,
    Dimensions, StyleSheet, Image, FlatList
} from 'react-native';

import global from '../../../global';
import closeIcon from '../../../../media/appIcon/close.png';
import sendOrder from '../../../../api/sendOrder';
import getToken from '../../../../api/getToken';

const urlImg = 'http://localhost/api/images/product/';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class Cart extends Component {
    incrQuantity(id) {
        global.incrQuantity(id);
    }

    decrQuantity(id) {
        global.decrQuantity(id);
    }

    removeItem(id) {
        global.removeItem(id);
    }

    async onSendOrder() {
        try {
            const token = await getToken();
            console.log("get" + token);
            const arrayDetail = this.props.cartArray.map(e => ({
                id: e.product.id,
                quantity: e.quantity
            }));
            const kq = await sendOrder(JSON.parse(token), arrayDetail);
            console.log(kq);
            if (kq === 'THEM_THANH_CONG') {
                console.log('THEM THANH CONG');
            } else {
                console.log('THEM THAT BAI', kq);
            }
        } catch (e) {
            console.log(e);
        }
    }

    goToOrder() {
        const { navigation } = this.props;
        navigation.navigate("Order");
    }

    render() {
        const { checkoutButton, checkoutTitle, wrapper,
            product, mainRight, productController, 
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer, bold, closeStyle } = styles;

        const { cartArray, navigation } = this.props;
        const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        const totalPrice = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;

        return (
            <View style={wrapper}>
                <FlatList
                    data={cartArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={product}>
                            <Image source={{ uri: `${urlImg}${item.product.images[0]}` }} style={productImage} />
                            <View style={[mainRight]}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={txtName}>{toTitleCase(item.product.name)}</Text>
                                    <TouchableOpacity onPress={() => { this.removeItem(item.product.id) }}>
                                        <Image style={closeStyle} source={closeIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={txtPrice}>${item.product.price}</Text>
                                </View>
                                <View style={productController}>
                                    <View style={numberOfProduct}>
                                        <TouchableOpacity onPress={() => { this.incrQuantity(item.product.id) }}>
                                            <Text style={bold}>+</Text>
                                        </TouchableOpacity>
                                        <Text>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => this.decrQuantity(item.product.id)}>
                                            <Text style={bold}>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("ProductDetail", {
                                                product: item.product
                                            });
                                        }}
                                        style={showDetailContainer} >
                                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                />
                <TouchableOpacity style={checkoutButton}
                    onPress={() => {
                        navigation.navigate("Order", {
                            cartArray: cartArray,
                            totalPrice: totalPrice
                        });
                    }}>
                    <Text style={checkoutTitle}>TOTAL ${totalPrice}, CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#E8E9EB'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#E4572E',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    product: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#242424',
        fontSize: 23,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#E4572E',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#E4572E',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    bold: {
        fontWeight: 'bold',
        color: '#242424'
    },
    closeStyle: {
        height: 10,
        width: 10
    },

});

export default Cart;
