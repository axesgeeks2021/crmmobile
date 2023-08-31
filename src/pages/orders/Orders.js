import { ScrollView, StyleSheet, Text, View, useWindowDimensions, Image, Button, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'

import Card from "../../components/Card"
import { useTheme } from 'react-native-paper'
import Bar from '../../components/Bar'

import Icon from "react-native-vector-icons/Entypo"

import AsyncStorage from '@react-native-async-storage/async-storage';



const Orders = ({ route }) => {

  const orderId = route.params.id;

  console.log('orderid ', orderId)

  const { width } = useWindowDimensions()

  const theme = useTheme()

  const [orderDetails, setOrderDetails] = useState([])

  console.log('order details', orderDetails)

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

  // const lastContentOffset = useSharedValue(0);
  // const isScrolling = useSharedValue(false);
  // const translateY = useSharedValue(0);

  // const actionBarStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: withTiming(translateY.value, {
  //           duration: 750,
  //           easing: Easing.inOut(Easing.ease),
  //         }),
  //       },
  //     ],
  //   };
  // });

  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (event) => {
  //     if (
  //       lastContentOffset.value > event.contentOffset.y &&
  //       isScrolling.value
  //     ) {
  //       translateY.value = 0;
  //       console.log("scrolling up");
  //     } else if (
  //       lastContentOffset.value < event.contentOffset.y &&
  //       isScrolling.value
  //     ) {
  //       translateY.value = 100;
  //       console.log("scrolling down");
  //     }
  //     lastContentOffset.value = event.contentOffset.y;
  //   },
  //   onBeginDrag: (e) => {
  //     isScrolling.value = true;
  //   },
  //   onEndDrag: (e) => {
  //     isScrolling.value = false;
  //   },
  // });

  useEffect(() => {
    const subscribe = fetchOrder()

    return () => subscribe
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >

        {/* <View>
                  <Image style={{ width: width, height: 200 }} source={{ uri: ele?.profile_pic }} resizeMode='cover' />
                </View> */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.to_address?.user?.username}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.to_address?.user?.first_name}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.to_address?.user?.last_name}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.to_address?.user?.phone}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.to_address?.user?.email}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.batteries?.code}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.batteries?.manufacturer}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.batteries?.product_warranty}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.batteries?.title}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.inverter?.rated_output_power}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.inverter?.code}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.inverter?.inverter_type}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.inverter?.rated_output_power}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.inverter_quantity}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.meter_Number}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.meter_Phase}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.monitoring}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.panels?.code}</Text>
          <Text style={styles.textStyle}>
            <Icon name='500px' size={24} color="#000" /> {orderDetails?.panels?.manufacturer}</Text>
        </View>
      </ScrollView>
      <View >
        <Button title='Start Project' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 26,
  }
})

export default Orders


{/* <ScrollView>
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Documents & Forms" number={0} autoNumber="" errormsg="pending electrical" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
        <Bar title="Photos" number={0} autoNumber="auto 0" errormsg="pending mandatory * photos" icon={<Icon name='camera' size={30} color="green" />} />
      </ScrollView> */}