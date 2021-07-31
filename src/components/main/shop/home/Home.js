import React, { Component } from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import NewCollection from './NewCollection';
import Category from './Category';
import TopProduct from './TopProduct';

export default class Home extends Component {

    render() {
        const { types, navigation, topProducts } = this.props;
        return (
            <ScrollView>
                <NewCollection />
                <Category navigation={navigation}
                    types={types}
                />
                <TopProduct navigation={navigation}
                    topProducts={topProducts} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#E8E9EB',
        flex: 1,
    }
})
