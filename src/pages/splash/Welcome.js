import { Animated, Modal, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import Button from "../../components/Button"
import { useTheme } from 'react-native-paper'

const Welcome = ({navigation}) => {
    const { width, height } = useWindowDimensions()

    const [loginModal, setLoginModal] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)

    const opacity = useRef(new Animated.Value(0)).current

    Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false
    }).start()

    const str = 'welcome to the solar 365 Installer panel'

    const theme = useTheme()


    return (
        <Animated.View ref={opacity} style={{
            flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: theme.colors.green, transform: [{
                scale: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                })
            }],
            borderRadius: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [width, 0]
            })
        }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: width / str.length * 3, color: '#fff', fontWeight: '500' }}>{str}</Text>
            </View>
            <View style={{flex: 1}}>
                <Button buttonText='Login' backgroundColor="white" onPress={() => setLoginModal(true)} />
                <Button buttonText='Register' backgroundColor="white" onPress={() => setRegisterModal(true)}/>
            </View>
            <Modal transparent={false} visible={loginModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button buttonText='Login as a Electrician' onPress={() => navigation.navigate('login')}/>
                    <Button buttonText='Login as a Installer' onPress={() => navigation.navigate('login')}/>
                    <Button buttonText='Go Back' onPress={() => setLoginModal(false)}/>
                </View>
            </Modal>
            <Modal transparent={false} visible={registerModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button buttonText='Register as a Electrician' onPress={() => navigation.navigate('register')}/>
                    <Button buttonText='Register as a Installer' onPress={() => navigation.navigate('register')} />
                    <Button buttonText='Go Back' onPress={() => setRegisterModal(false)}/>
                </View>
            </Modal>
        </Animated.View>
    )
}

export default Welcome

const styles = StyleSheet.create({})