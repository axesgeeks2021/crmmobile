import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'

import Input from '../../components/Input';
import { Button, useTheme } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangePassword = () => {

    const { width } = useWindowDimensions();

    const theme = useTheme()

    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const changePassword = async () => {
        try {
            const auth = await AsyncStorage.getItem('auth')
            const parseAuth = JSON.parse(auth)

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${parseAuth?.token}`);

            const formdata = new FormData();
            formdata.append("current_password", currentPassword);
            formdata.append("password", password);
            formdata.append("confirm_password", confirmPassword);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/change-password/", requestOptions)
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
                <Input placeholder="Enter your current password..." onChangeText={text => setCurrentPassword(text)} value={currentPassword} />
                <Input placeholder="Enter your password..." onChangeText={text => setPassword(text)} value={password} />
                <Input placeholder="Enter your confirm password..." onChangeText={text => setConfirmPassword(text)} value={confirmPassword} />
                <Button mode='contained' style={{ backgroundColor: theme.colors.darkGreen, borderRadius: 0 }} onPress={() => changePassword}>Submit</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default ChangePassword
