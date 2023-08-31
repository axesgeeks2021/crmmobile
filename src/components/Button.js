import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = (props) => {
  return (
    <TouchableOpacity style={{
        width: props.width,
        paddingHorizontal: props.paddingHorizontal || 10,
        paddingVertical: props.paddingVertical || 5,
        borderColor: props.borderColor || '#000',
        borderWidth: props.borderWidth || 2,
        marginHorizontal: props.marginHorizontal || 0,
        marginVertical: props.marginVertical || 5,
        borderRadius: props.borderRadius || 0,
        backgroundColor: props.backgroundColor,
    }}
        onPress={props.onPress}
    >
        <Text style={{
            fontSize: props.fontSize || 20,
            fontWeight: props.fontWeight || '500',
            color: props.color || '#000',
            textAlign: props.textAlign || 'center'
        }}>
            {props.buttonText}
        </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})