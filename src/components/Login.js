import { StyleSheet, View, useWindowDimensions, Text, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'

import Input from '../components/Input'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = ({navigation}) => {

    const {width} = useWindowDimensions()

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = async () => {

        // if(!(email && password)){
        //     alert("Please fill all the field!")
        //     return
        // }

        try {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            const raw = JSON.stringify({
              "email": "kalimali2295@gmail.com",
              "password": "123"
            });
            
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            const res = await fetch("http://192.168.29.90:8000/api1/userlogin", requestOptions)

            const data  = await res.json()

            // console.log(data)
            if(data.status ===  true){
                setTimeout(() => {
                    navigation.navigate('chatlist', {auth: JSON.stringify(data)})
                }, 1300)
                setEmail('')
                setPassword('')
            }else{
                alert(data.message)
                setLoading(false)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(loading){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )
    }

  return (
    <View style={[styles.container]}>
        <View style={[styles.inputContainer]}>
            <Input placeholder="Enter your email..." width={width - 20} onChangeText={text => setEmail(text)} value={email}/>
            <Input placeholder="Enter your password..." width={width - 20} onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}/>
            <Button buttonText="Login" width={width / 3} onPress={() => navigation.navigate('chatlist')}/>
      </View>
      <View style={[styles.btnContainer]}>
        <Text>
            Don't Have Account. Click on Register Button
        </Text>
            <Button buttonText="Register Here" width={width / 2} onPress={() => navigation.navigate('register')}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    inputContainer: {
        flex: 0.80,
        justifyContent: 'center',
        alignItems: "center"
    },
    btnContainer: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: "center"
    }
})

export default Login
