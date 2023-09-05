import { FlatList, StyleSheet, Text, TouchableHighlight, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import Card from "../../components/Card"

import { Button, List, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GetLocation, {
    Location,
    LocationError,
    LocationErrorCode,
} from 'react-native-get-location';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });

const DashBoard = ({ navigation }) => {

    const { width, height } = useWindowDimensions()

    const theme = useTheme()

    const [data, setData] = useState([])

    const [orderList, setOrderList] = useState([])

    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);


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

    const requestLocation = () => {
        setLoading(true);
        setLocation(null);
        setError(null);
    
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 30000,
          rationale: {
            title: 'Location permission',
            message: 'The app needs the permission to request your location.',
            buttonPositive: 'Ok',
          },
        })
          .then(newLocation => {
            // AsyncStorage.setItem('location', newLocation)
            setLoading(false);
            setLocation(newLocation);
            console.log('new loaction', newLocation)

          })
          .catch(ex => {
            if (ex instanceof LocationError) {
              const {code, message} = ex;
              console.warn(code, message);
              setError(code);
            } else {
              console.warn(ex);
            }
            setLoading(false);
            setLocation(null);
          });
      };

    useEffect(() => {
        const subscribe = fetchOrder()

        requestLocation()

        return () => subscribe
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Button onPress={() => navigation.navigate('site-docs')}>Site Docs</Button>
            <Button onPress={() => navigation.navigate('signature')}>Signature</Button>
            <Button onPress={() => navigation.navigate('test')}>Test</Button>
            <Button onPress={() => navigation.navigate('completed-jobs-details')}>Test</Button>
            <Button onPress={() => navigation.navigate('get-location')}>Test</Button>
            <View style={{ flex: 0.10, justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 20, color: theme.colors.darkGreen }}>Your upcoming appointments</Text>
            </View>
            <View style={{ flex: 0.90, borderTopColor: theme.colors.green, borderTopWidth: 1 }}>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={orderList}
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => navigation.navigate('order-detail', {id: item?.id, location: location})}>
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