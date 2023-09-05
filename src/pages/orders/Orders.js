import { ScrollView, StyleSheet, Text, View, useWindowDimensions, Image, Button,Animated, TouchableOpacity, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import Card from "../../components/Card"
import { useTheme } from 'react-native-paper'
import Bar from '../../components/Bar'

import Icon from "react-native-vector-icons/Entypo"

import AsyncStorage from '@react-native-async-storage/async-storage';


const Orders = ({ route , navigation}) => {

  const orderId = route.params.id
  const location = route.params.location

  const translationRef = useRef(new Animated.Value(100)).current

  const { width } = useWindowDimensions()

  const theme = useTheme()

  const [orderDetails, setOrderDetails] = useState([])

  const [scrollValue, setScrollValue] = useState(false)

  const fetchOrder = async () => {
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

      fetch(`http://solar365.co.in/assign/${orderId}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setOrderDetails(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const startProject = () => {
    if((location.latitude).toFixed(2) === (+orderDetails?.to_address?.latitude).toFixed(2) && (location.longitude).toFixed(2) === (+orderDetails?.to_address?.longitude).toFixed(2)){
      return alert('You to reach to order location!...then start the project')
    }
    return navigation.push('upload-site-documents')
  }

  const onScollFunction = () => {
    Animated.timing(translationRef, {
      toValue: scrollValue ? 0 : -100,
      useNativeDriver: true,
      duration: 250,
    }).start
  }


 useEffect(() => {
    const subscribe = fetchOrder()

    return () => subscribe
  }, [])

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}  scrollEventThrottle={16}
    onScroll={(e) => {
      const scrolling = e.nativeEvent.contentOffset.y

      if(scrolling > 100){
        return setScrollValue(true)
      }
      if(scrolling < 100){
        return setScrollValue(false)
      }
    }} >
        <View style={[styles.card, { width: width - 20 }]}>
            <View style={[styles.profile, { width: width - 40 }]}>
                <Text style={{ fontSize: 22, fontWeight: '600' }}>Profile</Text>
            </View>
            <View style={[styles.innerCard]}>
                <Text style={[styles.text]}>{orderDetails?.to_address?.user?.username}</Text>
                <Text style={[styles.text]}>{orderDetails?.to_address?.user?.first_name.toUpperCase()} {orderDetails?.order?.to_address?.user?.last_name.toUpperCase()}</Text>
                <Text style={[styles.text]}>{orderDetails?.to_address?.user?.email}</Text>
                <Text style={[styles.text]}>{orderDetails?.to_address?.user?.phone}</Text>
            </View>
        </View>
        <View style={[styles.card, { width: width - 20 }]}>
            <View style={[styles.profile, { width: width - 40 }]}>
                <Text style={{ fontSize: 22, fontWeight: '600' }}>Project Details</Text>
            </View>
            <View style={[styles.innerCard]}>
                <Text style={[styles.text]}>{orderDetails?.system_Size}</Text>
                <Text style={[styles.text]}>{orderDetails?.building_Type}</Text>
                <Text style={[styles.text]}>{orderDetails?.nmi_no}</Text>
                <Text style={[styles.text]}>{orderDetails?.company_Name}</Text>
            </View>
        </View>
        <View style={[styles.card, { width: width - 20 }]}>
            <View style={[styles.profile, { width: width - 40 }]}>
                <Text style={{ fontSize: 22, fontWeight: '600' }}>Meter Details</Text>
            </View>
            <View style={[styles.innerCard]}>
                <Text style={[styles.text]}>{orderDetails?.monitoring_quantity}</Text>
                <Text style={[styles.text]}>{orderDetails?.monitoring}</Text>
                <Text style={[styles.text]}>{orderDetails?.meter_Phase}</Text>
                <Text style={[styles.text]}>{orderDetails?.meter_Number}</Text>
            </View>
        </View>
        {
            orderDetails?.assign_to?.map((ele, idx) => {
                return (
                    <View style={[styles.card, { width: width - 20 }]} key={idx}>
                        <View style={[styles.profile, { width: width - 40 }]}>
                            <Text style={{ fontSize: 22, fontWeight: '600' }}>Assign To {ele?.user_type.toUpperCase()}</Text>
                        </View>
                        <View style={[styles.innerCard]}>
                            <Text style={[styles.text]}>{ele?.username}</Text>
                            <Text style={[styles.text]}>{ele?.first_name.toUpperCase()} {ele?.last_name.toUpperCase()}</Text>
                            <Text style={[styles.text]}>{ele?.email}</Text>
                            <Text style={[styles.text]}>{ele?.phone}</Text>
                        </View>
                    </View>
                )
            })
        }

        {/* <View style={[styles.card, { width: width - 20 }]}>
            <View style={[styles.profile, { width: width - 40 }]}>
            <Text style={{ fontSize: 22, fontWeight: '600' }}>Assign To {orderDetails?.order?.assign_to?.user_type.toUpperCase()}</Text>                    </View>
            <View style={[styles.innerCard]}>
                <Text style={[styles.text]}>{orderDetails?.order?.monitoring_quantity}</Text>
                <Text style={[styles.text]}>{orderDetails?.order?.monitoring}</Text>
                <Text style={[styles.text]}>{orderDetails?.order?.meter_Phase}</Text>
                <Text style={[styles.text]}>{orderDetails?.order?.meter_Number}</Text>
            </View>
        </View> */}
    
        <View style={[styles.card, { width: width - 20 }]}>
            <View style={[styles.profile, { width: width - 40 }]}>
                <Text style={{ fontSize: 22, fontWeight: '600' }}>Battery</Text>
            </View>
            <View style={[styles.innerCard]}>
                <Text style={[styles.text]}>{orderDetails?.batteries?.title}</Text>
                <Text style={[styles.text]}>{orderDetails?.batteries?.code}</Text>
                <Text style={[styles.text]}>{orderDetails?.batteries?.total_energy}</Text>
                <Text style={[styles.text]}>{orderDetails?.batteries?.manufacturer}</Text>
                <Text style={[styles.text]}>{orderDetails?.batteries?.product_warranty}</Text>
            </View>
        </View>
        <View style={[styles.card, { width: width - 20 }]}>
            <View style={[styles.profile, { width: width - 40 }]}>
                <Text style={{ fontSize: 22, fontWeight: '600' }}>Inverter</Text>
            </View>
            <View style={[styles.innerCard]}>
                <Text style={[styles.text]}>{orderDetails?.inverter?.title}</Text>
                <Text style={[styles.text]}>{orderDetails?.inverter_quantity}</Text>
                <Text style={[styles.text]}>{orderDetails?.inverter?.code}</Text>
                <Text style={[styles.text]}>{orderDetails?.inverter?.inverter_type}</Text>
                <Text style={[styles.text]}>{orderDetails?.inverter?.rated_output_power}</Text>
                <Text style={[styles.text]}>{orderDetails?.inverter?.manufacturer}</Text>
                <Text style={[styles.text]}>{orderDetails?.inverter?.product_warranty}</Text>
            </View>
        </View>
        
        <View style={[styles.card, { width: width - 20 }]}>
            <View style={[styles.profile, { width: width - 40 }]}>
                <Text style={{ fontSize: 22, fontWeight: '600' }}>Panels</Text>
            </View>
            <View style={[styles.innerCard]}>
                <Text style={[styles.text]}>{orderDetails?.panels?.title}</Text>
                <Text style={[styles.text]}>{orderDetails?.panels_quantity}</Text>
                <Text style={[styles.text]}>{orderDetails?.panels?.code}</Text>
                <Text style={[styles.text]}>{orderDetails?.panels?.technology}</Text>
                <Text style={[styles.text]}>{orderDetails?.panels?.product_warranty}</Text>
                <Text style={[styles.text]}>{orderDetails?.panels?.performance_warranty}</Text>
            </View>
        </View>
        
    </ScrollView>
    <Animated.View style={[styles.action, {width: width - 10,opacity: 1, transform: [{translateY: scrollValue ? 0 : 100}]}]}>
    <TouchableOpacity onPress={startProject} >
        <Text style={[styles.actionItem]}>Start Project</Text>
    </TouchableOpacity>
    </Animated.View>
</View>

  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10
  },
  card: {
      marginHorizontal: 'auto',
      elevation: 10,
      backgroundColor: "#003F91",
      marginVertical: 5
  },
  profile: {
      backgroundColor: '#fff',
      padding: 5,
      alignSelf: 'center',
      marginVertical: 10
  },
  innerCard: {
      padding: 20
  },
  text: {
      color: '#fff',
      fontSize: 18,
      marginVertical: 2,
  },
  secondProfile : {
      backgroundColor: "#B9D6F2",
  },
  
  action: {
    flexDirection: "row",
    borderRadius: 4,
    padding: 10,
    position: "absolute",
    bottom: 5,
    backgroundColor: "#4B88A2",
    justifyContent: "space-around",
  },
  actionItem: {
    color: "#fff",
    fontSize: 26,
  },
})
export default Orders

