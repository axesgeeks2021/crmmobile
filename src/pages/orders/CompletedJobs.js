import { FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/Entypo'
import IconI from "react-native-vector-icons/Ionicons"
import IconF from "react-native-vector-icons/FontAwesome"
import IconM from "react-native-vector-icons/MaterialCommunityIcons"


const CompletedJobs = ({navigation}) => {

    const { width } = useWindowDimensions()

    const [completedJobs, setCompletedJobs] = useState([])

    const fetchCompletedOrders = async () => {
        try {

            const auth = await AsyncStorage.getItem('auth')
            const parseAuth = JSON.parse(auth)

            console.log('parse', parseAuth)

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${parseAuth?.token}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/assign-completed-order-list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setCompletedJobs(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchCompletedOrders() 

        return () => [subscribe]
    }, [])

    return (
        <>   
       <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', width }}>
            <FlatList
                data={completedJobs}
                contentContainerStyle={{ overflow: 'hidden', width: "90%" }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={[styles.container, { width: width - 20, flexDirection: 'row', overflow: 'hidden', }]} onPress={() => navigation.navigate('completed-jobs-details')}>
                            <View style={{ width: 5, height: '90%', backgroundColor: '#fff', alignSelf: 'center', marginHorizontal: 8 }} />
                            <View style={{ width: "10%" }}>

                            </View>
                            <View style={{ width: width }}>
                                <View style={{ width, overflow: 'hidden', paddingVertical: 10 }}>
                                    <View style={{ width: '70%', marginBottom: 15, backgroundColor: '#fff', alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 5 }}>
                                        <Text style={[styles.text, { color: '#4B88A2', fontWeight: '600', letterSpacing: 2 }]}>
                                            <Icon name='dot-single' color="#4B88A2" size={20} />{item?.project}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <IconF name='user' color="#fff" size={20} /><Text style={[styles.text]}>{item?.to_address?.user?.first_name.toUpperCase()} {item?.to_address?.user?.last_name.toUpperCase()}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <IconM name='email' color="#fff" size={20} /><Text style={[styles.text]}>{item?.to_address?.user?.email}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='mobile' color="#fff" size={20} /><Text style={[styles.text]}>{item?.to_address?.user?.phone}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/*<IconI name='time' color="#fff" size={20} /><Text style={[styles.text]}>{item?.order_start_date.split(' ')[0]} {item?.order_start_date.split(' ')[1].substring(0, item?.order_start_date.split(' ')[1].length - 1)}</Text>*/}
                                    <IconI name='time' color="#fff" size={20} /><Text style={[styles.text]}>{item?.order_start_date}</Text>
                                    
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/*      <IconI name='time' color="#fff" size={20} /><Text style={[styles.text]}>{item?.order_end_date.split(' ')[0]} {item?.order_end_date.split(' ')[1].substring(0, item?.order_end_date.split(' ')[1].length - 1)}</Text>*/}
                                        <IconI name='time' color="#fff" size={20} /><Text style={[styles.text]}>{item?.order_end_date}</Text>
                    </View>
                                    <View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

            </View>
            
            </>
    )
}
const styles = StyleSheet.create({
    container: {
        elevation: 10,
        backgroundColor: '#4B88A2',
        marginVertical: 10
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginHorizontal: 10
    }
})

export default CompletedJobs
