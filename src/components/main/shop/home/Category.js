import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

export default class Home extends Component {

    render() {
        const { wrapper, textStyle, bannerImage, row1, row2, activeDotStyle } = styles;
        const { types, navigation } = this.props;
        const urlImg = 'http:/localhost/api/images/type/';
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <Text style={textStyle}>LIST OF CATEGORY</Text>
                </View>
                <View style={row2}>
                    <Swiper
                        autoplay={true}
                        activeDot={<View style={activeDotStyle} />}
                    >
                        {types.map(e => (
                            <TouchableOpacity key={e.id} onPress={() => {
                                navigation.navigate("ListCategory", {
                                    type: e
                                });
                            }}>
                                <Image source={{ uri: `${urlImg}${e.image}` }} style={bannerImage} />
                            </TouchableOpacity>
                        ))}
                    </Swiper>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        height: height * 0.25,
        margin: 10,
        shadowColor: '#746D69',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10
    },
    textStyle: {
        fontSize: 25,
        color: '#E7753A',
        fontFamily: 'Avenir'
    },
    bannerImage: {
        width: width - 40,
        height: height / 5.5
    },
    row1: {
        flex: 1,
    },
    row2: {
        flex: 4
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
    }
})
