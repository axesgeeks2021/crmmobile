import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'



const Bar = (props) => {

    const { width } = useWindowDimensions()

    return (
        <View style={{ width, paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'green', borderBottomWidth: 1, borderTopWidth: 1, borderTopColor: 'green' }}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20 }}>{props.title}</Text>
                    <Text style={{ fontSize: 20, backgroundColor: 'green', color: 'white', paddingHorizontal: 10, marginHorizontal: 7 }}>{props.number}</Text>
                    <Text style={{ fontSize: 20, borderWidth: 1, borderColor: 'green', paddingHorizontal: 6 }}>{props.autoNumber}</Text>
                </View>
                <Text style={{ color: 'red' }}>({props.errormsg})</Text>
            </View>
            <View>
                {props.icon}
            </View>
        </View>
    )
}

export default Bar

const styles = StyleSheet.create({})