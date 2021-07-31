import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar, Alert, TextInput, ScrollView
} from 'react-native';
import global from '../../global';
import deleteProduct from '../../../api/deleteProduct';
import changeProductInfo from '../../../api/changeProductInfo';
import ImagePicker from 'react-native-image-crop-picker';
import getImagesByProduct from '../../../api/getImagesByProduct';
import changeImages from '../../../api/changeImages';

const back = require('../../../media/appIcon/left-arrow.png');
const deleteIcon = require('../../../media/appIcon/delete.png');
const uploadImg = require('../../../media/appIcon/cloud-computing.png');
const urlImg = 'http://localhost/api/images/product/';
const { height, width } = Dimensions.get('window');


export default class ProductDetailAdmin extends Component {
    constructor(props) {
        super(props);
        const { name, price, color, material, description, images, id } = this.props.route.params.product;
        this.state = {
            productName: name,
            productPrice: price,
            productColor: color,
            productMaterial: material,
            productDescription: description,
            productId: id,
            image1: images[0],
            image2: images[1],
            image3: images[2],
            imageList: [],
        };
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    goToShopAdmin = () => {
        global.refreshData();
        const { navigation } = this.props;
        navigation.navigate("MainAdmin");
    }

    componentDidMount() {
        const { id } = this.props.route.params.product;
        console.log(id)
        getImagesByProduct(id)
            .then(res => this.setState({ imageList: res }))
            .catch(e => console.log(e));
    }

    deleteItem() {
        const { id } = this.props.route.params.product;
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        deleteProduct(id)
                            .then(res => {
                                if (res == "DELETE_SUCCESSFULLY") {
                                    Alert.alert(
                                        "Successfully!",
                                        "This item has been deleted successfully",
                                        [
                                            { text: "OK", onPress: this.goToShopAdmin.bind(this) }
                                        ]
                                    );
                                } else if (res == "DELETE_UNSUCCESSFULLY") {
                                    Alert.alert(
                                        "Unsuccessfully!",
                                        "This item can not be deleted",
                                        [
                                            { text: "OK", onPress: this.goToShopAdmin.bind(this) }
                                        ]
                                    );
                                }
                            })
                            .catch(err => console.log(err));
                    }
                }
            ]
        );
    }

    changeProductInfo() {
        const { productId, productName, productPrice, productColor, productMaterial, productDescription, image1, image2, image3, imageList } = this.state;
        changeProductInfo(productId, productName, productPrice, productColor, productMaterial, productDescription)
            .then(res => {
                if (res == 'SUCCESSFULLY') {
                    changeImages(imageList[0].id, image1)
                        .then(result => console.log(result))
                        .catch(e => console.log(e));
                    changeImages(imageList[1].id, image2)
                        .then(result => console.log(result))
                        .catch(e => console.log(e));
                    changeImages(imageList[2].id, image3)
                        .then(result => console.log(result))
                        .catch(e => console.log(e));
                    Alert.alert(
                        "Successfully!",
                        "This item has been updated successfully",
                        [
                            { text: "OK", onPress: this.goToShopAdmin.bind(this) }
                        ]
                    );
                }
            })
            .catch(e => console.log(e));
    }

    handleImagePicker1 = () => {
        ImagePicker.openPicker({
        }).then(image => {
            this.setState({ image1: image.filename });
            console.log(image)
        });
    }
    handleImagePicker2 = () => {
        ImagePicker.openPicker({
        }).then(image => {
            this.setState({ image2: image.filename });
        });
    }
    handleImagePicker3 = () => {
        ImagePicker.openPicker({
        }).then(image => {
            this.setState({ image3: image.filename });
        });
    }

    goToProductReviewAdmin() {
        const { navigation } = this.props;
        navigation.navigate("ProductReviewAdmin");
    }

    render() {
        const {
            wrapper, cardStyle, header, footer, textMain, submitText, submitContainer, textInput, title, itemImg, upload, uploadWrapper, multilineInp
        } = styles;

        const { name, images } = this.props.route.params.product;
        const { image1, image2, image3, imageList } = this.state;
        const { product } = this.props.route.params;
        return (
            <View style={wrapper}>
                <View style={cardStyle}>
                    <View style={header}>
                        <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"></StatusBar>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image source={back} />
                        </TouchableOpacity>
                        <Text style={title}>{name}</Text>
                        <TouchableOpacity onPress={this.deleteItem.bind(this)}>
                            <Image source={deleteIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={footer}>
                        <ScrollView>
                            <View>
                                <Text style={textMain}>Product ID</Text>
                                <TextInput
                                    style={textInput}
                                    placeholder="Product ID"
                                    autoCapitalize="none"
                                    value={this.state.productId}
                                    underlineColorAndroid="transparent"
                                    editable={false}
                                />
                            </View>
                            <View>
                                <Text style={textMain}>Product Name</Text>
                                <TextInput
                                    style={textInput}
                                    placeholder="Product name"
                                    autoCapitalize="none"
                                    value={this.state.productName}
                                    onChangeText={text => this.setState({ productName: text })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View>
                                <Text style={textMain}>Product Price</Text>
                                <TextInput
                                    style={textInput}
                                    placeholder="Product price"
                                    autoCapitalize="none"
                                    value={this.state.productPrice}
                                    onChangeText={text => this.setState({ productPrice: text })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View>
                                <Text style={textMain}>Product Color</Text>
                                <TextInput
                                    style={textInput}
                                    placeholder="Product color"
                                    autoCapitalize="none"
                                    value={this.state.productColor}
                                    onChangeText={text => this.setState({ productColor: text })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View>
                                <Text style={textMain}>Product Material</Text>
                                <TextInput
                                    style={textInput}
                                    placeholder="Product material"
                                    autoCapitalize="none"
                                    value={this.state.productMaterial}
                                    onChangeText={text => this.setState({ productMaterial: text })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View>
                                <Text style={textMain}>Product Description</Text>
                                <TextInput
                                    style={multilineInp}
                                    placeholder="Product description"
                                    autoCapitalize="none"
                                    value={this.state.productDescription}
                                    onChangeText={text => this.setState({ productDescription: text })}
                                    underlineColorAndroid="transparent"
                                    multiline={true}
                                />
                            </View>

                            <View style={uploadWrapper}>

                                <TouchableOpacity onPress={this.handleImagePicker1.bind(this)}>
                                    <Image source={{ uri: `${urlImg}${image1}` }} style={itemImg}></Image>
                                </TouchableOpacity>
                            </View>

                            <View style={uploadWrapper}>
                                <TouchableOpacity onPress={this.handleImagePicker2.bind(this)}>
                                    <Image source={{ uri: `${urlImg}${image2}` }} style={itemImg}></Image>
                                </TouchableOpacity>
                            </View>

                            <View style={uploadWrapper}>
                                <TouchableOpacity onPress={this.handleImagePicker3.bind(this)}>
                                    <Image source={{ uri: `${urlImg}${image3}` }} style={itemImg}></Image>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={submitContainer} onPress={this.changeProductInfo.bind(this)}>
                                <Text style={submitText}>UPDATE PRODUCT INFORMATION</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={submitContainer} onPress={() => {
                                const { navigation } = this.props;
                                navigation.navigate("ProductReviewAdmin", {
                                    product: product
                                });
                            }}>
                                <Text style={submitText}>PRODUCT REVIEW</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    itemImg: {
        width: width * 0.85,
        height: width,
        margin: 20
    },
    title: {
        color: '#fff',
        fontSize: 23,
        fontFamily: 'Avenir',
    },
    header: {
        paddingTop: height / 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#E4572E',
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    footer: {
        flex: 10
    },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#E4572E',
        borderWidth: 1,
        fontSize: 18
    },

    multilineInp: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#E4572E',
        borderWidth: 1,
        fontSize: 18,
        height: 80,
    },

    imageContainer: {
        flex: 6,
        alignItems: 'center',
        margin: height / 40,
    },
    textMain: {
        paddingLeft: 20,
        marginVertical: 10,
        alignItems: 'center'
    },
    textBlack: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F3F46'
    },
    textSmoke: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#E4572E'
    },
    textHighlight: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#7D59C8'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
    },
    descContainer: {
        margin: 10,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#242424',
        fontFamily: 'Avenir',
        fontSize: 17
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: 280,
        height: 350,
        marginHorizontal: 5
    },
    mainRight: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: 20
    },
    txtMaterial: {
        color: '#E4572E',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    activeDotStyle: {
        backgroundColor: '#E4572E',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    buttonText: {
        color: '#E4572E',
        fontSize: 40,
    },
    submitText: {
        color: '#FFF',
        fontFamily: 'Avenir',
        fontWeight: '500',
        paddingHorizontal: 20,
        fontSize: 18
    },
    submitContainer: {
        marginHorizontal: 20,
        backgroundColor: '#E4572E',
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginBottom: 20
    },
    upload: {
        height: 50,
        width: 50,
        marginLeft: -50
    },
    uploadWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
