import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar, Alert, ScrollView, TextInput } from 'react-native';

import phoneIcon from '../../../../media/appIcon/phone-call.png';
import mailIcon from '../../../../media/appIcon/email.png';
import userIcon from '../../../../media/appIcon/userImg.png';
import locationIcon from '../../../../media/appIcon/pin.png';
import backSpecial from '../../../../media/appIcon/left-arrow.png';
import MapView from 'react-native-maps';
import global from '../../../global';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import getPlaceDetail from '../../../../api/getPlaceDetail';
import getToken from '../../../../api/getToken';
import getUserDetail from '../../../../api/getUserDetail';
import sendOrder from '../../../../api/sendOrder';
import changeAddress from '../../../../api/changeAddress';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 21.002369484419198,
            longitude: 105.84679754453076,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            address: "",
            userInfo: {},
            note: "",
        };
    }

    async onSendOrder() {
        const { cartArray } = this.props.route.params;
        const { address, note } = this.state;
        try {
            const token = await getToken();
            const arrayDetail = cartArray.map(e => ({
                id: e.product.id,
                quantity: e.quantity
            }));
            console.log(arrayDetail)
            const kq = await sendOrder(JSON.parse(token), arrayDetail, note);
            console.log(kq)
            if (kq === 'THEM_THANH_CONG') {
                changeAddress(JSON.parse(token), this.state.address)
                    .then(res => console.log(res))
                    .catch(e => console.log(e));
                Alert.alert(
                    'Successfully',
                    'Thank you for your order!',
                    [
                        {
                            text: 'OK', onPress: () => {
                                global.resetCart();
                                this.goToMain();
                            }
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                console.log('THEM THAT BAI', kq);
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        getToken()
            .then(token => {
                getUserDetail(JSON.parse(token))
                    .then(res => {
                        this.setState({ userInfo: res });
                        this.setState({ address: res.address });
                    });
            });
    }

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    goToMain() {
        const { navigation } = this.props;
        navigation.navigate("Main");
    }

    render() {
        const {
            mapContainer, wrapper, infoContainer, checkoutButton, checkoutTitle, multilineInp,
            rowInfoContainer, imageStyle, infoText, headerTitle, header, backIconStyle
        } = styles;
        const { latitude, longitude, latitudeDelta, longitudeDelta, address, userInfo } = this.state;
        const { totalPrice } = this.props.route.params;
        return (
            <View style={wrapper}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"></StatusBar>
                <View style={header}>
                    <View />
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>Delivery Information</Text>
                </View>
                <GooglePlacesAutocomplete
                    placeholder='Enter your address'
                    GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                    GooglePlacesSearchQuery={{
                        rankby: "distance"
                    }}
                    enablePoweredByContainer={false}
                    onPress={(data, details = null) => {
                        this.setState({ address: details.description });
                        getPlaceDetail(details.place_id)
                            .then(res => {

                                this.setState({ latitude: res.result ? res.result.geometry.location.lat : 0 });
                                this.setState({ longitude: res.result ? res.result.geometry.location.lng : 0 });

                            });
                    }}
                    query={{
                        key: global.API_KEY,
                        language: 'en',
                    }}
                    styles={{
                        container: { flex: 0, width: "100%", zIndex: 1 },
                        listView: { backgroundColor: "white" }
                    }}
                />
                <ScrollView>
                    <View style={mapContainer}>
                        <MapView
                            style={{ width: width - 20, height: 405 }}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: latitudeDelta,
                                longitudeDelta: longitudeDelta,
                            }}
                            provider="google"
                        >
                            <MapView.Marker
                                coordinate={{ latitude: latitude, longitude: longitude }}
                                title="Your address"
                            />
                        </MapView>
                    </View>
                    <View style={infoContainer}>
                        <View style={rowInfoContainer}>
                            <Image source={locationIcon} style={imageStyle} />
                            <Text style={infoText}>{address}</Text>
                        </View>

                        <View style={rowInfoContainer}>
                            <Image source={phoneIcon} style={imageStyle} />
                            <Text style={infoText}>{userInfo.phone}</Text>
                        </View>
                        <View style={rowInfoContainer}>
                            <Image source={mailIcon} style={imageStyle} />
                            <Text style={infoText}>{userInfo.email}</Text>
                        </View>
                        <View style={[rowInfoContainer, { borderBottomWidth: 0 }]}>
                            <Image source={userIcon} style={imageStyle} />
                            <Text style={infoText}>{userInfo.name}</Text>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            style={multilineInp}
                            placeholder="Note"
                            autoCapitalize="none"
                            value={this.state.productDescription}
                            onChangeText={text => this.setState({ note: text })}
                            underlineColorAndroid="transparent"
                            multiline={true}
                        />
                    </View>
                    <TouchableOpacity style={checkoutButton} onPress={this.onSendOrder.bind(this)}>
                        <Text style={checkoutTitle}>TOTAL ${totalPrice}, ORDER NOW</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#F6F6F6' },
    mapStyle: {
        width: width - 40,
        height: 230,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        height: 410
    },
    infoContainer: {
        padding: 10,
        backgroundColor: '#FFF',
        margin: 10,
        marginTop: 0,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    rowInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#D6D6D6',
        height: 60
    },
    imageStyle: {
        width: 30,
        height: 30
    },
    infoText: {
        fontFamily: 'Avenir',
        color: '#242424',
        fontWeight: '500',
        fontSize: 17
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#E4572E',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },

    header: {
        backgroundColor: "#E4572E",
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: width / 15,
        paddingTop: 23,
        height: 80
    },
    headerTitle: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontSize: 25,
        paddingLeft: width / 15
    },
    backIconStyle: { width: 30, height: 30 },
    multilineInp: {
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 10,
        borderColor: '#E4572E',
        borderWidth: 1,
        fontSize: 18,
        height: 100,
        color: '#746D69',
        marginBottom: 10
    },
});

export default Order;
