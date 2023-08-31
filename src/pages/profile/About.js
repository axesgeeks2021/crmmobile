import { ScrollView, StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const About = () => {

    const [data, setData] = useState([])

    const { width } = useWindowDimensions();

    const theme = useTheme()

    const fetchData = async () => {

        try {
            const auth = await AsyncStorage.getItem('auth')
            const parseAuth = JSON.parse(auth)

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${parseAuth?.token}`);


            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`http://solar365.co.in/update_profile/${parseAuth?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result)
                    setData(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchData()

        return () => subscribe
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.20, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: width / 3, height: width / 3, borderRadius: width / 3 }} resizeMode='cover' source={{ uri: data?.profile_pic }} />
            </View>
            <View style={{ flex: 0.80, backgroundColor: theme.colors.darkGreen, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView>
                    <View style={{ width: width - 20,borderColor: theme.colors.white, borderWidth: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: theme.colors.white }}>Username :</Text><Text style={{ fontSize: 20, color: theme.colors.white }}> {data?.username}</Text>
                    </View>
                    <View style={{ width: width - 20,borderColor: theme.colors.white, borderWidth: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: theme.colors.white }}>First Name :</Text><Text style={{ fontSize: 20, color: theme.colors.white }}> {data?.first_name}</Text>
                    </View>
                    <View style={{ width: width - 20,borderColor: theme.colors.white, borderWidth: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: theme.colors.white }}>Last Name :</Text><Text style={{ fontSize: 20, color: theme.colors.white }}> {data?.last_name}</Text>
                    </View>
                    <View style={{ width: width - 20,borderColor: theme.colors.white, borderWidth: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: theme.colors.white }}>Email :</Text><Text style={{ fontSize: 20, color: theme.colors.white }}> {data?.email}</Text>
                    </View>
                    <View style={{ width: width - 20,borderColor: theme.colors.white, borderWidth: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: theme.colors.white }}>Phone :</Text><Text style={{ fontSize: 20, color: theme.colors.white }}> {data?.phone}</Text>
                    </View>
                    <View style={{ width: width - 20,borderColor: theme.colors.white, borderWidth: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: theme.colors.white }}>User Type :</Text><Text style={{ fontSize: 20, color: theme.colors.white }}> {data?.user_type}</Text>
                    </View>
                 </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default About
