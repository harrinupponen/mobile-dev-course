import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

export default function History(props) {

    const {params} = props.navigation.state;

    return (
        <View style={styles.history}>
            <FlatList
                contentContainerStyle={styles.list}
                data={params.history}
                renderItem={({item}) =>
                    <Text>{item.key}</Text>
            }/>
        </View>
    )
}

const styles = StyleSheet.create({
    history: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        flex:1,
        justifyContent: 'center'
    }
});