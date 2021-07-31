import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar, ScrollView, Alert
} from 'react-native';

const back = require('../../../media/appIcon/left-arrow.png');
const check = require('../../../media/appIcon/check.png');
const uncheck = require('../../../media/appIcon/multiply.png');
import phoneIcon from '../../../media/appIcon/phone-call.png';
import mailIcon from '../../../media/appIcon/email.png';
import locationIcon from '../../../media/appIcon/pin.png';
import getOrderDetail from '../../../api/getOrderDetail';
import changeOrderStatus from '../../../api/changeOrderStatus';
import getUserInfo from '../../../api/getUserInfo';
import profileImg from '../../../media/temp/item1.png';
import global from '../../global';
import noteIcon from '../../../media/appIcon//notes.png';

const { height, width } = Dimensions.get('window');
const urlImg = 'http://localhost/api/images/product/';

export default class OrderDetailAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: {},
            productList: [],
            orderStatus: "",
            userInfo: {},
        }
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    goToMain() {
        const { navigation } = this.props;
        navigation.navigate("Main");
    }

    componentDidMount() {
        const { orderId } = this.props.route.params;
        getOrderDetail(orderId)
            .then(res => {
                this.setState({ orderInfo: res });
                this.setState({ productList: res.products });
                if (res.status == "0") {
                    this.setState({ orderStatus: "Pending" });
                } else if (res.status == "1") {
                    this.setState({ orderStatus: "Completed" });
                } else {
                    this.setState({ orderStatus: "Cancelled" });
                }
                getUserInfo(res.customerId)
                    .then(user => this.setState({ userInfo: user }))
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    cancelOrder() {
        const { orderId } = this.props.route.params;
        Alert.alert(
            "Cancel Order",
            "Are you sure you want to cancel this order?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        changeOrderStatus(orderId, 2)
                            .then(res => {
                                if (res == "UPDATE_SUCCESSFULLY") {
                                    Alert.alert(
                                        'Successfully',
                                        'You have cancelled this order!',
                                        [
                                            {
                                                text: 'OK', onPress: () => {
                                                    global.refreshOrders();
                                                    this.goBack();
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                } else {
                                    Alert.alert(
                                        'Unsuccessfully',
                                        'Can not cancel this order!',
                                        [
                                            { text: 'OK' }
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            })
                            .catch(e => console.log(e))
                    }
                }
            ]
        );

    }

    acceptOrder() {
        const { orderId } = this.props.route.params;
        Alert.alert(
            "Accept Order",
            "Are you sure you want to accept this order?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        changeOrderStatus(orderId, 1)
                            .then(res => {
                                if (res == "UPDATE_SUCCESSFULLY") {
                                    Alert.alert(
                                        'Successfully',
                                        'You have accepted this order!',
                                        [
                                            {
                                                text: 'OK', onPress: () => {
                                                    global.refreshOrders();
                                                    this.goBack();
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                } else {
                                    Alert.alert(
                                        'Unsuccessfully',
                                        'Can not accept this order!',
                                        [
                                            { text: 'OK' }
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            })
                            .catch(e => console.log(e))
                    }
                }
            ]
        );

    }


    render() {
        const {
            wrapper, cardStyle, header, footer, headerTitle, textBlack, imageStyle, paymentWrapper,
            textMain, totalPrice, rowInfoContainer, txtMaterial, infoContainer, infoText, titleText,
            itemStyle, itemName, txtPrice, checkoutButton, checkoutTitle, userWrapper,
            itemInfo, itemImg, acceptButton, acceptTitle
        } = styles;
        const { orderInfo, productList, orderStatus, userInfo } = this.state;
        const { navigation } = this.props;
        return (
            <View style={wrapper}>
                <View style={cardStyle}>
                    <View style={header}>
                        <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"></StatusBar>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image source={back} />
                        </TouchableOpacity>
                        <Text style={headerTitle}>Order Detail</Text>
                    </View>

                    <ScrollView style={footer}>
                        <View>
                            <View style={textMain}>
                                <Image source={orderStatus == "Cancelled" ? uncheck : check} />
                                <Text style={textBlack}>{orderStatus}</Text>
                            </View>
                        </View>

                        <View style={infoContainer}>
                            <Text style={titleText}>Delivery Address</Text>
                            <View style={rowInfoContainer}>
                                <Image source={locationIcon} style={imageStyle} />
                                <Text style={infoText}>{userInfo.address}</Text>
                            </View>
                            <View style={rowInfoContainer}>
                                <Image source={phoneIcon} style={imageStyle} />
                                <Text style={infoText}>{userInfo.phone}</Text>
                            </View>
                            <View style={rowInfoContainer}>
                                <Image source={mailIcon} style={imageStyle} />
                                <Text style={infoText}>{userInfo.email}</Text>
                            </View>
                            {orderInfo.note ? <View style={rowInfoContainer}>
                                <Image source={noteIcon} style={imageStyle} />
                                <Text style={infoText}>{orderInfo.note}</Text>
                            </View> : <Text></Text>}
                        </View>

                        <TouchableOpacity style={infoContainer}
                            onPress={() => {
                                navigation.navigate("UserDetail", {
                                    userInfo: userInfo
                                });
                            }}>
                            <Text style={titleText}>Customer Information</Text>
                            <View style={userWrapper}>
                                <Image source={userInfo.avatar ? { uri: `${urlImg}${userInfo.avatar}` } : profileImg} style={itemImg}></Image>
                                <View style={itemInfo}>
                                    <Text style={itemName}>{userInfo.name}</Text>
                                    <Text style={txtPrice}>ID{userInfo.id}</Text>
                                    <Text style={txtMaterial}>{userInfo.email}</Text>
                                    <Text style={txtMaterial}>{userInfo.phone}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>

                        <View style={infoContainer}>
                            <View style={paymentWrapper}>
                                <Text style={titleText}>Total Payment</Text>
                                <Text style={totalPrice}>${orderInfo.total}</Text>
                            </View>

                            {productList.map(item => (
                                <TouchableOpacity style={itemStyle} key={item.id}
                                    onPress={() => {
                                        navigation.navigate("ProductDetailAdmin", {
                                            product: item
                                        });
                                    }}>
                                    <Image source={{ uri: `${urlImg}${item.images[0]}` }} style={itemImg} />
                                    <View style={itemInfo}>
                                        <Text style={itemName}>{item.name}</Text>
                                        <Text style={txtPrice}>${item.price}</Text>
                                        <Text style={txtMaterial}>x{item.quantity}</Text>
                                        <Text style={txtMaterial}>Material: {item.material}</Text>
                                        <Text style={txtMaterial}>Color: {item.color}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {orderStatus == "Pending" ?
                            <View>
                                <TouchableOpacity style={checkoutButton} onPress={this.acceptOrder.bind(this)}>
                                    <Text style={checkoutTitle}>Accept Order</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={acceptButton} onPress={this.cancelOrder.bind(this)}>
                                    <Text style={acceptTitle}>Cancel Order</Text>
                                </TouchableOpacity>
                            </View>
                            : <Text></Text>
                        }

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#E4572E',
        paddingTop: 25,
        height: height / 10
    },

    userWrapper: {
        flexDirection: "row",
        marginTop: 10
    },

    productStyle: {
        width: width / 2,
        height: width / 2
    },
    footer: {
        backgroundColor: '#E8E9EB',
    },

    textMain: {
        paddingLeft: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        display: "flex",
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: 'center',
    },

    paymentWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    textBlack: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F3F46',
        paddingLeft: 20
    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 23,
        fontWeight: 'bold',
        color: '#3F3F46',
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
    headerTitle: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontSize: 25,
        paddingLeft: width / 15
    },
    infoContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    rowInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    imageStyle: {
        width: 30,
        height: 30
    },
    infoText: {
        fontFamily: 'Avenir',
        color: '#393e46',
        fontWeight: '400',
        fontSize: 17,
        paddingLeft: 10
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
    },
    totalPrice: {
        color: '#E4572E',
        fontSize: 20
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        backgroundColor: '#E4572E',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    acceptButton: {
        height: 50,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E4572E',
    },

    checkoutTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    acceptTitle: {
        color: '#E4572E',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
});