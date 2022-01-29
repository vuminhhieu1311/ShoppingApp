import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, View, Image, Dimensions } from 'react-native';
import global from '../../../global';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

const { width } = Dimensions.get('window');
const urlImg = 'http://localhost/api/images/product/';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: []
        };
        global.setArraySearch = this.setSearchArray.bind(this);
    }

    setSearchArray(arrProduct) {
        this.setState({ listProducts: arrProduct });
    }

    render() {
        const {
            product, mainRight, txtMaterial, txtColor,
            txtName, txtPrice, productImage,
            txtShowDetail, showDetailContainer
        } = styles;
        const { listProducts } = this.state;
        const { navigation } = this.props;
        return (
            <FlatList
                data={listProducts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity style={product}
                        onPress={() => {
                            navigation.navigate("ProductDetail", {
                                product: item
                            });
                        }}>
                        <Image source={{ uri: `${urlImg}${item.images[0]}` }} style={productImage} />
                        <View style={mainRight}>
                            <Text style={txtName}>{toTitleCase(item.name)}</Text>
                            <Text style={txtPrice}>${item.price}</Text>
                            <Text style={txtMaterial}>Material: {item.material}</Text>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={txtColor}>Color: {item.color}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ProductDetail", {
                                        product: item
                                    });
                                }}
                                style={showDetailContainer}>
                                <Text style={txtShowDetail}>SHOW DETAILS</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
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
        width: width * 0.3,
        height: width * 0.3,
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
        color: '#1b262c',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#E4572E',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtColor: {
        paddingLeft: 20,
        color: '#746D69',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtMaterial: {
        paddingLeft: 20,
        color: '#746D69',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#E4572E',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 100
    }
});

export default Search;
