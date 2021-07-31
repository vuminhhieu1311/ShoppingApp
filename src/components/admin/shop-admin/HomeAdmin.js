import React, { Component } from 'react';
import { StyleSheet, ScrollView, TextInput} from 'react-native';
import CategoryAdmin from './CategoryAdmin';
import TopProductAdmin from './TopProductAdmin';

export default class HomeAdmin extends Component {
    render() {
        const { types, navigation, topProducts } = this.props;
        return (
            <ScrollView>
                <CategoryAdmin navigation={navigation}
                    types={types}
                />
                <TopProductAdmin navigation={navigation}
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
