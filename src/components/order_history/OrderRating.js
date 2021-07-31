import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, TextInput, Alert
} from 'react-native';
import backSpecial from '../../media/appIcon/left-arrow.png';
import filledStar from '../../media/appIcon/filled_star.png';
import star from '../../media/appIcon/star.png';
import addBillRating from '../../api/addBillRating';
import addProductRating from '../../api/addProductRating';
import addProductComment from '../../api/addProductComment';
import global from '../global';

const urlImg = 'http://localhost/api/images/product/';
export default class OrderRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultRating: 2,
            maxRating: [1, 2, 3, 4, 5],
            comment: ""
        };
    }

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    goToOrderHistory() {
        const { navigation } = this.props;
        navigation.navigate("OrderHistory");
    }

    onSuccess() {
        Alert.alert(
            'Successfully',
            'Your feedback has been sent!',
            [
                {
                    text: 'OK', onPress: () => {
                        this.goToOrderHistory();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    handleSendFeedback() {
        const { productList, orderInfo } = this.props.route.params;
        const { defaultRating, comment } = this.state;
        console.log(productList);
        console.log(orderInfo)
        addBillRating(orderInfo.id, defaultRating, comment)
            .then(res => {
                if (res == "SUCCESSFULLY") {
                    productList.map((item) => {
                        addProductRating(item.id, defaultRating)
                            .then(res => console.log(res))
                            .catch(e => console.log(e));
                        addProductComment(item.id, orderInfo.customerId, comment, defaultRating)
                            .then(res => {
                            })
                            .catch(e => console.log(e));
                    });
                    global.refreshData();
                    this.onSuccess();
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        const { wrapper, header, headerTitle, backIconStyle, ratingWrapper, starImg,
            multilineInp, checkoutButton, checkoutTitle, infoContainer, paymentWrapper,
            titleText, totalPrice, itemStyle, itemImg, itemInfo, itemName, txtPrice, txtMaterial } = styles;
        const { defaultRating, maxRating, comment } = this.state;
        const { productList, orderInfo } = this.props.route.params;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>Rate your order</Text>
                </View>

                <View style={infoContainer}>
                    <View style={paymentWrapper}>
                        <Text style={titleText}>Your order</Text>
                        <Text style={totalPrice}>${orderInfo.total}</Text>
                    </View>

                    {productList.map(item => (
                        <TouchableOpacity style={itemStyle} key={item.id}
                            onPress={() => {
                                navigation.navigate("ProductDetail", {
                                    product: item
                                });
                            }}>
                            <Image source={{ uri: `${urlImg}${item.images[0]}` }} style={itemImg} />
                            <View style={itemInfo}>
                                <Text style={itemName}>{item.name}</Text>
                                <Text style={txtPrice}>${item.price}</Text>
                                <Text style={txtMaterial}>x{item.quantity}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={ratingWrapper}>
                    {maxRating.map(item => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => { this.setState({ defaultRating: item }) }}
                        >
                            <Image
                                source={
                                    item <= defaultRating ? filledStar : star
                                }
                                style={starImg}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View>
                    <TextInput
                        style={multilineInp}
                        placeholder="Leave a comment"
                        autoCapitalize="none"
                        value={this.state.productDescription}
                        onChangeText={text => this.setState({ comment: text })}
                        underlineColorAndroid="transparent"
                        multiline={true}
                    />
                </View>
                <TouchableOpacity style={checkoutButton} onPress={this.handleSendFeedback.bind(this)}>
                    <Text style={checkoutTitle}>Send Feedback</Text>
                </TouchableOpacity>

            </View>
        )
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
        height: height / 10,
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

    ratingWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    },

    starImg: {
        margin: 10
    },

    multilineInp: {
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 10,
        marginTop: 20,
        borderColor: '#E4572E',
        borderWidth: 1,
        fontSize: 18,
        height: 200,
        color: '#746D69',
    },
    checkoutButton: {
        height: 50,
        margin: 20,
        backgroundColor: '#E4572E',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },

    checkoutTitle: {
        color: '#FFF',
        fontSize: 25,
        fontFamily: 'Avenir'
    },

    infoContainer: {
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
    },

    paymentWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    totalPrice: {
        color: '#E4572E',
        fontSize: 20
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
        width: width * 0.15,
        height: width * 0.15
    },
    itemName: {
        color: '#1b262c',
        fontSize: 20,
        fontFamily: 'Avenir',
    },
    txtPrice: {
        color: '#E4572E',
    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 24,
        color: '#3F3F46',
    },
});