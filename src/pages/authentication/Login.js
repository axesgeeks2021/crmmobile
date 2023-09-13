import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, useWindowDimensions, Modal, BackHandler } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showModal, setShowModal] = useState(false)

    const { width } = useWindowDimensions()

    const theme = useTheme()

    const login =  async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "csrftoken=7ymQRh5w0E6hKghTxgRYAxD1TtgcpyPO; sessionid=xf1p8belggftg8cn5nu9h9m6qyvh37x3");

            const raw = JSON.stringify({
                "username": email,
                "password": password
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const res = await fetch("http://solar365.co.in/login/", requestOptions)
            const data = await res.json()
            
            if(data.message == "Success"){
                await AsyncStorage.setItem('auth', JSON.stringify(data))
                return navigation.navigate('bottomNavigation')
            }
            return alert(data.message)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const backHandler =  BackHandler.addEventListener('hardwareBackPress', () => true)

        return () => backHandler.remove()
    }, [])

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://plus.unsplash.com/premium_photo-1674939149067-54c18a73efa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' }}
                style={styles.background}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: 'https://www.solar365.net.au/assets/img/logoo.webp' }}
                    style={styles.logo}
                />
            </View>
            <View style={styles.formContainer}>
                {/* <Text style={[styles.title, {fontSize: 38, backgroundColor: theme.colors.darkGreen, width, textAlign: 'center'}]}>Login</Text> */}
                <View style={styles.card}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder="User Id"
                            placeholderTextColor="#999"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                        />
                    </View>
                    <Button mode='contained' style={{ backgroundColor: theme.colors.darkGreen, borderRadius: 0 }} onPress={login}>Submit</Button>
                </View>
            </View>
            <View style={{ width, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 20, alignItems: 'center' }}>
                <Text style={{
                    fontSize: 18, marginVertical: 5


                }}>Don't have an account. Please Register Here</Text>
                <Button onPress={() => navigation.navigate('register')} mode='contained' style={{ backgroundColor: theme.colors.darkGreen, borderRadius: 0 }} >Click Here</Button>
            </View>
            <Modal transparent={false} visible={showModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button title='Register as a Electrician' onPress={() => navigation.navigate('register')} />
                    <Button title='Register as a Installer' onPress={() => navigation.navigate('register')} />
                    <Button title='Go Back' onPress={() => setShowModal(false)} />
                </View>
            </Modal>
        </View>
    )
}

export default Login


const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: "white"
    },
    logo: {
        width: 160,
        height: 120,
        borderRadius: 60,
        resizeMode: 'contain',
    },

    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
        marginTop: 20,
    },
    card: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 20,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 20,
        color: '#333',
    },
    input: {
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#333',
        paddingLeft: 10,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
};