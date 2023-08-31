import { StyleSheet, Text, View, Image, useWindowDimensions, FlatList, TouchableOpacity, BackHandler } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const profileList = [
    {
        id: 1,
        link: 'about',
        name: 'About'
    },
    {
        id: 2,
        link: 'change-password',
        name: 'Change Password'
    },
    {
        id: 3,
        link: 'forgot-password',
        name: 'Forgot Password'
    },
    {
        id: 4,
        link: 'transaction',
        name: 'Transaction'
    },
    {
        id: 5,
        link: 'help',
        name: 'Help'
    },
]

const Profile = ({ navigation }) => {

    const { width, height } = useWindowDimensions()

    const theme = useTheme()

    const logout = async () => {
        await AsyncStorage.removeItem('auth')
       navigation.reset({
        index: 0,
        routes: [{name: 'login'}]
       })
    }

    useEffect(() => {
        const backHandler =  BackHandler.addEventListener('hardwareBackPress', () => true)

        return () => backHandler.remove()
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.20, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: width / 3, height: width / 3, borderRadius: width / 3 }} resizeMode='cover' source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" }} />
            </View>
            <View style={{ flex: 0.80, backgroundColor: theme.colors.darkGreen, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={profileList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate(item.link)} style={{ width: width - 20, marginVertical: 10, paddingHorizontal: 10, paddingVertical: 10, borderColor: 'white', borderWidth: 2 }}>
                                <Text style={{ fontSize: 22, color: 'white' }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                <TouchableOpacity onPress={logout} style={{ width: width - 20, marginVertical: 10, paddingHorizontal: 10, paddingVertical: 10, borderColor: 'white', borderWidth: 2 }}>
                    <Text style={{ fontSize: 22, color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})