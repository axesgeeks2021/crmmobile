import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'

import Input from '../../components/Input';
import { Button, useTheme } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';


const ForgotPassword = () => {

    const { width } = useWindowDimensions();

    const theme = useTheme()

    const [text, setText] = useState('')

    const forgotPassword = async () => {
        try {
            const auth = await AsyncStorage.getItem('auth')
            const parseAuth = JSON.parse(auth)

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${parseAuth?.token}`);
            myHeaders.append("Content-Type", "application/json");
        
            const raw = JSON.stringify({
                "email": text
            });
        
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
        
            fetch("http://solar365.co.in/forgot-password/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.log('error', error));        
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: width - 20 }}>
                <Input placeholder="Enter your email..." onChangeText={text => setText(text)} value={text} />
                <Button mode='contained' style={{ backgroundColor: theme.colors.darkGreen, borderRadius: 0 }} onPress={() => forgotPassword}>Submit</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default ForgotPassword
