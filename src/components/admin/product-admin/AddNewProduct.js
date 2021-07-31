import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar, Alert, TextInput, ScrollView
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import postProduct from '../../../api/postProduct';
import postImage from '../../../api/postImage';

const back = require('../../../media/appIcon/left-arrow.png');
const deleteIcon = require('../../../media/appIcon/delete.png');
const uploadImg = require('../../../media/appIcon/cloud-computing.png');
const urlImg = 'http://localhost/api/images/product/';
const { height, width } = Dimensions.get('window');


export default class AddNewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productPrice: '',
            productColor: '',
            productMaterial: '',
            productDescription: '',
            idType: '',
            imageList: [],
        };
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    goToShopAdmin = () => {
        const { navigation } = this.props;
        navigation.navigate("ShopAdmin");
    }

    handleAddingProduct() {
        const { productName, productPrice, productColor, productMaterial, productDescription, imageList, idType } = this.state;
        postProduct(productName, productPrice, productColor, productMaterial, productDescription, idType)
            .then(res => {
                if (res) {
                    imageList.forEach((img) => {
                        
                        postImage(res, img.filename)
                            .then(result => console.log(result))
                            .catch(e => console.log(e));
                    })

                    Alert.alert(
                        "Successfully!",
                        "This item has been added successfully",
                        [
                            { text: "OK", onPress: this.goToShopAdmin.bind(this) }
                        ]
                    );

                    this.refreshState();
                }
            })
            .catch(e => console.log(e));
    }

    handleImagePicker = () => {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images)
            this.setState({ imageList: images });
        });
    }

    refreshState() {
        this.setState({productName: '', productPrice: '', productColor: '',  productMaterial: '', productDescription: '', idType: '', imageList: []})
    }

    render() {
        const {
            wrapper, cardStyle, header, footer, textMain, submitText, submitContainer,
            textInput, title, itemImg, upload, uploadWrapper, multilineInp, 
        } = styles;
        const { imageList } = this.state;
        return (
            <View style={wrapper}>
                <View style={cardStyle}>
                    <View style={header}>
                        <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"></StatusBar>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image source={back} />
                        </TouchableOpacity>
                        <Text style={title}>Add A New Product</Text>

                    </View>
                    <View style={footer}>
                        <ScrollView>
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
                            <View>
                                <Text style={textMain}>Category</Text>
                                <RNPickerSelect
                                    style={{ ...pickerSelectStyles }}
                                    placeholder={{
                                        label: 'Select a category...',
                                        value: null,
                                    }}
                                    onValueChange={(value) => this.setState({ idType: value })}
                                    items={[
                                        { label: 'Women', value: '4' },
                                        { label: 'Men', value: '5' },
                                        { label: 'Accessories', value: '6' },
                                    ]}
                                />
                            </View>

                            <View style={uploadWrapper}>
                                <Text style={textMain}>Upload Item Images</Text>
                                <TouchableOpacity onPress={this.handleImagePicker.bind(this)}>
                                    <Image source={uploadImg} style={upload} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                {imageList ? imageList.map(img => (
                                    <Image source={{ uri: img.path }} style={itemImg} key={img.path}></Image>
                                )) : ""
                                }
                            </View>

                            <TouchableOpacity style={submitContainer} onPress={this.handleAddingProduct.bind(this)}>
                                <Text style={submitText}>ADD PRODUCT</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({

    inputIOS: {
        borderWidth: 1,
        borderColor: '#E4572E',
        borderRadius: 4,
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 18
    },

});

const styles = StyleSheet.create({

    pickerSelect: {
        color: '#E4572E',
        marginLeft: 30
    },

    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    itemImg: {
        width: width * 0.89,
        height: width,
        margin: 20,
        marginTop: 0,
    },
    title: {
        color: '#fff',
        fontSize: 23,
        fontFamily: 'Avenir',
        marginLeft: 20
    },
    header: {
        paddingTop: height / 50,
        flexDirection: 'row',
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
        marginBottom: 15,
        borderColor: '#E4572E',
        borderWidth: 1,
        fontSize: 18
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
    multilineInp: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 15,
        borderColor: '#E4572E',
        borderWidth: 1,
        fontSize: 18,
        height: 80,
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
        alignSelf: 'stretch'
    },
    upload: {
        height: 35,
        width: 35,
        marginLeft: 20,
        marginBottom: 20
    },
    uploadWrapper: {
        flexDirection: "row",
    }
});
