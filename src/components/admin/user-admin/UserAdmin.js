import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import global from '../../global';
import icSearch from '../../../media/appIcon/ic_search.png';
import AllUsers from './AllUsers';
import ActiveUsers from './ActiveUsers';
import LockedUsers from './LockedUsers';
import AddUser from './AddUser';
import getAllUsers from '../../../api/getAllUsers';
import backSpecial from '../../../media/appIcon/left-arrow.png';
import getActiveUsers from '../../../api/getActiveUsers';
import searchUser from '../../../api/searchUser'

const { height, width } = Dimensions.get('window');

export default class UserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "all",
            userList: [],
            activeUsers: [],
            lockedUsers: [],
            searchText: '',
        };
        global.refreshUser = this.refreshUser.bind(this);
        global.goToAllUsers = this.goToAllUser.bind(this);
    }

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    goToAllUser() {
        this.setState({selectedTab: "all"});
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    refreshUser() {
        getAllUsers()
            .then(res => this.setState({ userList: res }))
            .catch(e => console.log(e));
        getActiveUsers("1")
            .then(res => this.setState({ activeUsers: res }))
            .catch(e => console.log(e));
        getActiveUsers("0")
            .then(res => this.setState({ lockedUsers: res }))
            .catch(e => console.log(e));
    }

    componentDidMount() {
        StatusBar.setHidden(false);
        getAllUsers()
            .then(res => this.setState({ userList: res }))
            .catch(e => console.log(e));
        getActiveUsers("1")
            .then(res => this.setState({ activeUsers: res }))
            .catch(e => console.log(e));
        getActiveUsers("0")
            .then(res => this.setState({ lockedUsers: res }))
            .catch(e => console.log(e));

        // navigation refresh
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            getAllUsers()
                .then(res => this.setState({ userList: res }))
                .catch(e => console.log(e));
            getActiveUsers("1")
                .then(res => this.setState({ activeUsers: res }))
                .catch(e => console.log(e));
            getActiveUsers("0")
                .then(res => this.setState({ lockedUsers: res }))
                .catch(e => console.log(e));
        });
    }

    onSearch() {
        const { searchText } = this.state;
        searchUser(searchText)
            .then(users => {
                this.setState({ userList: users });
            })
            .catch(e => console.log.e);
    }

    goToSearch() {
        this.setState({ selectedTab: 'all' });
    }

    openMenu() {
        const { open } = this.props;
        open();
    } // Open the menu

    render() {
        const { wrapper, tabBarStyle, titleStyle, selectedTitleStyle, wrapperHeader,
            row1, searchText, logoStyle, iconStyle, row2, searchIcon, headerTitle } = styles;
        const { selectedTab, userList, activeUsers, lockedUsers } = this.state;
        const { navigation } = this.props;
        return (
            <View style={wrapper}>
                <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"></StatusBar>
                <View style={wrapperHeader}>
                    <View style={row1}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image source={backSpecial} style={iconStyle} />
                        </TouchableOpacity>
                        <Text style={headerTitle}>User Management</Text>
                    </View>
                    <View style={row2}>
                        <TextInput
                            style={searchText}
                            placeholder="Search User"
                            underlineColorAndroid="transparent"
                            onFocus={() => this.goToSearch()}
                            value={this.state.searchText}
                            onChangeText={(text) => {
                                this.setState({ searchText: text })
                            }}
                            onSubmitEditing={this.onSearch.bind(this)}
                        />
                        <TouchableOpacity onPress={this.onSearch.bind(this)}>
                            <Image source={icSearch} style={searchIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TabNavigator tabBarStyle={tabBarStyle}>
                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'all'}
                        title='All'
                        onPress={() => this.setState({
                            selectedTab: 'all'
                        })}>
                        <AllUsers navigation={navigation}
                            userList={userList} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'active'}
                        title='Active'
                        onPress={() => this.setState({
                            selectedTab: 'active'
                        })}>
                        <ActiveUsers navigation={navigation}
                            activeUsers={activeUsers} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'locked'}
                        title='Locked'
                        onPress={() => this.setState({
                            selectedTab: 'locked'
                        })}>
                        <LockedUsers navigation={navigation}
                            lockedUsers={lockedUsers} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        titleStyle={titleStyle}
                        selectedTitleStyle={selectedTitleStyle}
                        selected={selectedTab === 'add'}
                        title='Add User'
                        onPress={() => this.setState({
                            selectedTab: 'add'
                        })}>
                        <AddUser />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontSize: 25,
        paddingLeft: width / 15
    },
    wrapper: {
        flex: 1,
    },
    tabBarStyle: {
        height: height / 15,
        backgroundColor: "#fff",
        paddingBottom: 15,
    },
    titleStyle: {
        color: '#E3C3C3',
        fontFamily: 'Avenir',
        fontSize: 20
    },
    selectedTitleStyle: {
        color: '#e4572e',
        fontFamily: 'Avenir',
        fontWeight: "bold"
    },

    wrapperHeader: {
        height: height / 7,
        backgroundColor: "#E4572E",
        padding: 10,
        justifyContent: 'space-between',
        paddingTop: height / 25
    },
    row1: {
        flexDirection: 'row',
    },
    searchText: {
        height: height / 24,
        width: width * 0.81,
        backgroundColor: '#FFF',
        paddingLeft: 10,
        fontFamily: 'Avenir',
        paddingVertical: 0
    },
    logoStyle: {
        height: height / 21,
        width: width * 0.5
    },
    iconStyle: {
        width: width / 10,
        height: height / 24
    },
    searchIcon: {
        marginLeft: width * 0.03,
        width: width / 10,
        height: height / 24
    },
    row2: {
        flexDirection: 'row',
    }
})
