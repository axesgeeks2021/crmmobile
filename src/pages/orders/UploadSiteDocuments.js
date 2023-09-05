import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import IconI from "react-native-vector-icons/Ionicons"

import Documents from '../../components/Documents'

function UploadSiteDocuments() {

    const ref = useRef()

    const { width, height } = useWindowDimensions()

    const [value, setValue] = useState(false)

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: width,borderBottomWidth: 1,borderColor: 'black', justifyContent: 'space-between', padding: 15, flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.box]}>
                    <Icon name='home' size={60} color="#4B88A2" />
                </View>
                <View style={[styles.box]}>
                    <Text style={[styles.text]}>Start</Text>
                    <IconI name={value ? 'checkmark-done-sharp' : 'camera'} size={30} color="#5CB85C" onPress={() => setValue(!value)} />
                  
                </View>
                <View style={[styles.box]}>
                    <Text style={[styles.text]}>Middle</Text>
                    <IconI name='checkmark-done-sharp' size={30} color="#5CB85C" />
                </View>
                <View style={[styles.box]}>
                    <Text style={[styles.text]}>End</Text>
                    <IconI name='checkmark-done-sharp' size={30} color="#5CB85C" />
                </View>
            </View>
            <Documents icon="camera-sharp" text="Photos" iconcolor="#00acee" />
            <Documents icon="camera-sharp" text="Photos" iconcolor="#00acee" />
            <Documents icon="camera-sharp" text="Photos" iconcolor="#00acee" />
            <Documents icon="camera-sharp" text="Photos" iconcolor="#00acee" />
            <Documents icon="camera-sharp" text="Photos" iconcolor="#00acee" />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UploadSiteDocuments
