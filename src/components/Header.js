import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native'
import React from 'react'

import IconM from "react-native-vector-icons/MaterialCommunityIcons"

const Header = (props) => {

    const { width, height } = useWindowDimensions()

    return (
        <View style={[styles.container, { width }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/images/profile.png')} resizeMode='cover' style={[styles.img]} />
                <Text style={[styles.text]}>Arsenal</Text>
            </View>
            <View>
                <IconM name='dots-vertical' size={40} onPress={props.onPress}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: 'darkgray'
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 15
    },
    text: {
        fontSize: 20,
        color: 'gray',
        paddingHorizontal: 20
    }
})

export default Header
