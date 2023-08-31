import { StyleSheet, Text, View, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/AntDesign'

const listOfDocs = [
    {
        id: 1,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 2,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 3,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 4,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 5,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 6,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 7,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 8,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 9,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 10,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 11,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
    {
        id: 12,
        icon: <Icon name='tags' size={40} color="#931FFF" />,
        text: 'SWMS'
    },
]

const SiteDocs = ({navigation}) => {

    const { width, height } = useWindowDimensions()

    return (
        <View style={[styles.container, { width }]}>
            <View style={{ flex: 0.2 }}>
                <Text style={{ fontSize: 30, fontWeight: '600', color: '#931FFF', alignSelf: 'center' }}>Upload your all documents</Text>
            </View>
            <View style={{ flex: 0.8, width: "100%" }}>
                <FlatList
                    data={listOfDocs}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{flexDirection: 'column', justifyContent: 'center'}}
                    horizontal={false}
                    numColumns={3}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('upload-site-docs')} style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', width: (width / 3) - 20, paddingVertical: 8, elevation: 10, borderRadius: 5, marginHorizontal: 6, marginVertical: 10 }}>
                                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                    {item.icon}
                                </View>
                                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, color: '#931FFF', alignSelf: 'center' }}>
                                        {item.text}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default SiteDocs
