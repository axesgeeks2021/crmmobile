import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const Input = (props) => {
  return (
    <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText} 
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        placeholderTextColor={props.placeholdertextcolor}
        style={{
            width: props.width,
            paddingHorizontal: props.paddingHorizontal || 10,
            paddingVertical: props.paddingVertical || 5,
            borderColor: props.borderColor || '#000',
            borderWidth: props.borderWidth || 2,
            marginHorizontal: props.marginHorizontal || 0,
            marginVertical: props.marginVertical || 5,
            borderRadius: props.borderRadius || 0,
        }}
    />
  )
}

const styles = StyleSheet.create({})

export default Input
