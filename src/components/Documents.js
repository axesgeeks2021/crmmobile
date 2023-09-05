import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

import Icon from "react-native-vector-icons/Ionicons"

const Documents = ({icon, text, iconcolor}) => {

    const { width, height } = useWindowDimensions()

    return (
        <View style={[styles.box, {width: width}]}>
            <View style={{ justifyContent: 'center'}}>
                <Text style={[styles.text]}>{text}</Text>
            </View>
            <View>
                <Icon name={icon} size={50} color={iconcolor || 'green'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        padding: 15,
        marginVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    text: {
        fontSize: 24
    }
})

export default Documents
