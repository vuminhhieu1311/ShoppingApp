import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class TopProduct extends Component {
    render() {
        const { wrapper, titleContainer, title, body, productImage,
            productContainer, productName, productPrice } = styles;
        const { topProducts, navigation } = this.props;
        const urlImg = 'http://localhost/api/images/product/';
        return (
            <View style={wrapper}>
                <View style={titleContainer}>
                    <Text style={title}>TOP PRODUCT</Text>
                </View>
                <View style={body}>
                    {topProducts.map(item => (
                        <TouchableOpacity style={productContainer} onPress={() => {
                            navigation.navigate("ProductDetail", {
                                product: item
                            });
                        }} key={item.id}>
                            <Image source={{ uri: `${urlImg}${item.images[0]}` }} style={productImage} />
                            <Text style={productName}>{item.name}</Text>
                            <Text style={productPrice}>${item.price}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }
}

const itemWidth = (width - 50) / 2;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#746D69',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
    },
    title: {
        fontSize: 25,
        color: '#E7753A',
        fontFamily: 'Avenir'
    },
    titleContainer: {
        paddingLeft: 10,
        height: height / 20,
        justifyContent: 'center'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    productContainer: {
        shadowColor: '#746D69',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingBottom: 20,
    },
    productImage: {
        width: itemWidth,
        height: itemWidth * 1.5
    },
    productName: {
        paddingTop: 10,
        fontFamily: 'Avenir',
        color: '#746D69',
        fontSize: 20
    },
    productPrice: {
        fontFamily: 'Avenir',
        color: '#E7753A'
    }
})
