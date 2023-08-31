import { FlatList, StyleSheet, Text, TouchableHighlight, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import Card from "../../components/Card"

import { Button, List, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DashBoard = ({ navigation }) => {

    const { width, height } = useWindowDimensions()

    const theme = useTheme()

    const [data, setData] = useState([])

    const [orderList, setOrderList] = useState([])

    // const fetchOrder = async () => {
    //     try {
    //         const auth = await AsyncStorage.getItem('auth')
    //         const parseAuth = JSON.parse(auth)

    //         const myHeaders = new Headers();
    //         myHeaders.append("Authorization", `Token ${parseAuth?.token}`);

    //         const requestOptions = {
    //             method: 'GET',
    //             headers: myHeaders,
    //             redirect: 'follow'
    //         };

    //         fetch("http://solar365.co.in/get-order/", requestOptions)
    //             .then(response => response.json())
    //             .then(result => {
    //                 console.log(result)
    //                 setData(result)
    //             })
    //             .catch(error => console.log('error', error));
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const fetchOrder = async () => {
        try {
            const auth = await AsyncStorage.getItem('auth')
            const parseAuth = JSON.parse(auth)

            console.log('parse auth',parseAuth?.token)

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${parseAuth?.token}`);
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch("http://solar365.co.in/assign/", requestOptions)
              .then(response => response.json())
              .then(result => {
                setOrderList(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchOrder()

        return () => subscribe
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Button onPress={() => navigation.navigate('site-docs')}>Site Docs</Button>
            <Button onPress={() => navigation.navigate('signature')}>Signature</Button>
            <Button onPress={() => navigation.navigate('test')}>Test</Button>
            <View style={{ flex: 0.10, justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 20, color: theme.colors.darkGreen }}>Your upcoming appointments</Text>
            </View>
            <View style={{ flex: 0.90, borderTopColor: theme.colors.green, borderTopWidth: 1 }}>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={orderList}
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => navigation.navigate('order-detail', {id: item?.id})}>
                                <Card nmi={item?.nmi_no} size={item?.system_Size} title={item?.panels?.code} content={item?.inverter?.inverter_type} project={item?.project} email={item?.customer_name} description={item?.nmi_no} />
                            </TouchableHighlight>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default DashBoard

const styles = StyleSheet.create({})