import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, FlatList, RefreshControl } from 'react-native';

import backIcon from '../../../media/appIcon/left-arrow.png';
import getListProduct from '../../../api/getListProduct';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const urlImg = 'http://localhost/api/images/product/';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class ListCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: "",
            listProducts: [],
            page: 1
        }
    }

    componentDidMount() {
        const { id } = this.props.route.params.type;
        this.setState({ categoryId: id });
        getListProduct(id, 1)
            .then(arrProduct => {
                this.setState({ listProducts: arrProduct });
            })
            .catch(e => console.log(e));
    }

    openProductDetail = () => {
        const { navigation } = this.props;
        navigation.navigate("ProductDetail");
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    openWomenCategory() {
        this.setState({ categoryId: 4, page: 1 });
        getListProduct(4, 1)
            .then(arrProduct => {
                this.setState({ listProducts: arrProduct });
            })
            .catch(e => console.log(e));
    }

    openMenCategory() {
        this.setState({ categoryId: 5, page: 1 });
        getListProduct(5, 1)
            .then(arrProduct => {
                this.setState({ listProducts: arrProduct });
            })
            .catch(e => console.log(e));
    }

    openAccessoriesCategory() {
        this.setState({ categoryId: 6 });
        getListProduct(6, 1)
            .then(arrProduct => {
                this.setState({ listProducts: arrProduct });
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

    render() {
        const { wrapper, header, title, categories, btnCategory, txtCategory,
            activeCategory, itemStyle, itemInfo, itemImg, itemName, txtPrice, txtMaterial } = styles;
        const { listProducts, categoryId, deleteIcon} = this.state;
        const { navigation } = this.props;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image source={backIcon} />
                    </TouchableOpacity>
                    <Text style={title}>Categories</Text>
                </View>

                <View style={categories}>
                    <TouchableOpacity style={categoryId == 4 ? activeCategory : btnCategory}
                        onPress={this.openWomenCategory.bind(this)}>
                        <Text style={txtCategory}>Women</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={categoryId == 5 ? activeCategory : btnCategory}
                        onPress={this.openMenCategory.bind(this)}>
                        <Text style={txtCategory}>Men</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={categoryId == 6 ? activeCategory : btnCategory}
                        onPress={this.openAccessoriesCategory.bind(this)}>
                        <Text style={txtCategory}>Accessories</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={listProducts}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={-0.2}
                    onEndReached={() => {
                        getListProduct(categoryId, this.state.page + 1)
                            .then(arrProduct => {
                                this.setState({
                                    listProducts: this.state.listProducts.concat(arrProduct),
                                    page: this.state.page + 1,
                                });
                            })
                            .catch((e) => { console.log(e) });
                    }}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={itemStyle}
                            onPress={() => {
                                navigation.navigate("ProductDetailAdmin", {
                                    product: item
                                });
                            }}>
                            <Image source={{ uri: `${urlImg}${item.images[0]}` }} style={itemImg} />
                            <View style={itemInfo}>
                                <Text style={itemName}> {toTitleCase(item.name)} </Text>
                                <Text style={txtPrice}>${item.price}</Text>
                                <Text style={txtMaterial}>Material: {item.material}</Text>
                                <Text style={txtMaterial}>Color: {item.color}</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={deleteIcon} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    }
                />
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

    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 7
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

