import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar, ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
import global from '../../../global'
import profileImg from '../../../../media/temp/item1.png';
import filledStar from '../../../../media/appIcon/filled_star.png';
import halfStar from '../../../../media/appIcon/star-half-empty.png'
import star from '../../../../media/appIcon/star.png';
import getComment from '../../../../api/getComment';

const back = require('../../../../media/appIcon/left-arrow.png');
const cart = require('../../../../media/appIcon/cart.png');
const urlImg = 'http://localhost/api/images/product/';
const { height, width } = Dimensions.get('window');

export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxRating: [1, 2, 3, 4, 5],
            realRating: 5,
            floorRating: 5,
            commentList: []
        };
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    addItemToCart() {
        const { product } = this.props.route.params;
        global.addItemToCart(product);
    }

    componentDidMount() {
        const { numberRating, totalRating, id } = this.props.route.params.product;
        if(numberRating > 0) {
            const value = Math.round((totalRating / numberRating) * 10) / 10;
            this.setState({ realRating: value });
            this.setState({ floorRating: Math.floor((totalRating / numberRating)) });
        }
        getComment(id)
            .then(res => this.setState({ commentList: res }))
            .catch(e => console.log(e))
    }

    render() {
        const {
            wrapper, cardStyle, header, footer, imageContainer, textBlack, textSmoke, textHighlight,
            textMain, titleContainer, descContainer, productImageStyle, descStyle, txtMaterial,
            activeDotStyle, buttonText, ratingWrapper, starImg, feedbackStyle, feedbackTitle, ratingNumber,
            itemImg, itemInfo, itemName, commentCard, txtComment, userRating, userStarImg
        } = styles;

        const { name, price, color, material, description, images, numberRating, totalRating } = this.props.route.params.product;
        const { maxRating, floorRating, realRating, commentList } = this.state;

        return (
            <View style={wrapper}>
                <View style={cardStyle}>
                    <View style={header}>
                        <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"></StatusBar>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image source={back} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.addItemToCart.bind(this)}>
                            <Image source={cart} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <View style={imageContainer}>
                            <Swiper
                                activeDot={<View style={activeDotStyle} />}
                                showsButtons={true}
                                containerStyle={productImageStyle}
                                nextButton={<Text style={buttonText}>›</Text>}
                                prevButton={<Text style={styles.buttonText}>‹</Text>}
                            >
                                <Image source={{ uri: `${urlImg}${images[0]}` }} style={productImageStyle}></Image>
                                <Image source={{ uri: `${urlImg}${images[1]}` }} style={productImageStyle}></Image>
                                <Image source={{ uri: `${urlImg}${images[2]}` }} style={productImageStyle}></Image>
                            </Swiper>
                        </View>

                        <View style={footer}>
                            <View style={titleContainer}>
                                <View style={textMain}>
                                    <Text style={textBlack}>{name}</Text>
                                    <Text style={textSmoke}>${price}</Text>
                                </View>
                            </View>
                            <View style={descContainer}>
                                <Text style={descStyle}>{description}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                                    <Text style={txtMaterial}>Material: {material}</Text>
                                    <View style={{ flexDirection: 'row' }} >
                                        <Text style={txtMaterial}>Color: {color}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={feedbackStyle}>
                            <View style={feedbackTitle}>
                                <Text style={textBlack}>PRODUCT REVIEW</Text>
                            </View>

                            <View style={ratingWrapper}>

                                {maxRating.map(item => {
                                    var starUrl;
                                    if (item <= floorRating) {
                                        starUrl = filledStar;
                                    } else if ((realRating > floorRating) && item == floorRating + 1) {
                                        starUrl = halfStar;
                                    } else {
                                        starUrl = star;
                                    }

                                    return <View
                                        activeOpacity={0.7}
                                        key={item}
                                    >
                                        <Image
                                            source={starUrl}
                                            style={starImg}
                                        />
                                    </View>
                                })}
                                <Text style={ratingNumber}>{realRating} / {maxRating.length}</Text>
                            </View>

                            {commentList.map(userComment => (
                                <View style={commentCard} key={userComment.id}>
                                     <Image source={userComment.avatar ? { uri: `${urlImg}${userComment.avatar}` } : profileImg} style={itemImg}></Image>
                                    <View style={itemInfo}>
                                        <Text style={itemName}>{userComment.name}</Text>
                                        <View style={userRating}>
                                            {maxRating.map(item => (
                                                <View
                                                    activeOpacity={0.7}
                                                    key={item}
                                                >
                                                    <Image
                                                        source={
                                                            item <= userComment.star_number ? filledStar : star
                                                        }
                                                        style={userStarImg}
                                                    />
                                                </View>
                                            ))}
                                        </View>
                                        <Text style={txtComment}>{userComment.comment}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                    </ScrollView>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        flex: 1
    },
    cardStyle: {

        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingTop: height / 26,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 15,
        backgroundColor: '#E4572E',
        height: 100
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },

    imageContainer: {
        height: 500,
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
        color: '#3F3F46',
        textAlign: 'center'
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
        width: 350,
        height: 450,
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
    ratingWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        // marginTop: 10
    },

    userRating: {
        flexDirection: 'row',
        marginVertical: 8
    },

    userStarImg: {
        margin: 2,
        height: 15,
        width: 15
    },

    starImg: {
        margin: 5,
        height: 30,
        width: 30,

    },

    feedbackStyle: {
        marginTop: 30
    },

    ratingNumber: {
        marginLeft: 10,
        color: '#E4572E',
        fontSize: 20,
        marginTop: 10
    },
    itemInfo: {
        paddingLeft: 10,
        width: width * 0.7,
        justifyContent: 'space-between'
    },

    itemImg: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.3
    },
    itemName: {
        color: '#1b262c',
        fontSize: 20,
        fontFamily: 'Avenir',
    },

    txtComment: {
        color: '#746D69',
        fontSize: 16,
        fontFamily: 'Avenir',
    },
    commentCard: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#BBBCB6'
    }
});