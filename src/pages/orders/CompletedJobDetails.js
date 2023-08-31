import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


const CompletedJobDetails = () => {

    const { width } = useWindowDimensions()

    const [completedJobs, setCompletedJobs] = useState({})

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

            fetch(`http://solar365.co.in/assign-completed-order-list/18/`, requestOptions)
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40 }]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Profile</Text>
                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.to_address?.user?.username}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.to_address?.user?.first_name.toUpperCase()} {completedJobs?.order?.to_address?.user?.last_name.toUpperCase()}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.to_address?.user?.email}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.to_address?.user?.phone}</Text>
                    </View>
                </View>
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40 }]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Project Details</Text>
                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.system_Size}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.building_Type}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.nmi_no}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.company_Name}</Text>
                    </View>
                </View>
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40 }]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Meter Details</Text>
                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.monitoring_quantity}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.monitoring}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.meter_Phase}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.meter_Number}</Text>
                    </View>
                </View>
                {
                    completedJobs?.order?.assign_to.map((ele, idx) => {
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
                    <Text style={{ fontSize: 22, fontWeight: '600' }}>Assign To {completedJobs?.order?.assign_to?.user_type.toUpperCase()}</Text>                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.monitoring_quantity}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.monitoring}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.meter_Phase}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.meter_Number}</Text>
                    </View>
                </View> */}
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40 }]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Order</Text>
                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.to_address?.user?.first_name.toUpperCase()} {completedJobs?.order?.to_address?.user?.last_name.toUpperCase()}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.to_address?.user?.email}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.to_address?.user?.phone}</Text>
                    </View>
                </View>
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40 }]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Battery</Text>
                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.batteries?.title}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.batteries?.code}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.batteries?.total_energy}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.batteries?.manufacturer}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.batteries?.product_warranty}</Text>
                    </View>
                </View>
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40 }]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Inverter</Text>
                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.inverter?.title}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.inverter_quantity}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.inverter?.code}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.inverter?.inverter_type}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.inverter?.rated_output_power}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.inverter?.manufacturer}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.inverter?.product_warranty}</Text>
                    </View>
                </View>
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40 }]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Working Details</Text>
                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.order_start_date.split('T')[0]} {completedJobs?.order?.order_start_date.split('T')[1].substring(0, completedJobs?.order?.order_start_date.split('T')[1].length - 1)}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.order_end_date.split('T')[0]} {completedJobs?.order?.order_end_date.split('T')[1].substring(0, completedJobs?.order?.order_end_date.split('T')[1].length - 1)}</Text>
                        <Text style={[styles.text]}>{completedJobs?.working_hour}</Text>
                    </View>
                </View>
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40 }]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Panels</Text>
                    </View>
                    <View style={[styles.innerCard]}>
                        <Text style={[styles.text]}>{completedJobs?.order?.panels?.title}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.panels_quantity}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.panels?.code}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.panels?.technology}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.panels?.product_warranty}</Text>
                        <Text style={[styles.text]}>{completedJobs?.order?.panels?.performance_warranty}</Text>
                    </View>
                </View>
                <View style={[styles.card, { width: width - 20 }]}>
                    <View style={[styles.profile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Invoive</Text>
                    </View>
                    <View style={[styles.profile, styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Invoive Id</Text><Text style={{color: '#000', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.id}</Text>
                    </View>
                    <View style={[styles.profile,styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Invoive Title </Text><Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.invoice_title}</Text>
                    </View>
                    <View style={[styles.profile,styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Invoive Number </Text><Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.invoice_number}</Text>
                    </View>
                    <View style={[styles.profile,styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Quantity </Text><Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.quantity}</Text>
                    </View>
                    <View style={[styles.profile,styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Price </Text><Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.rate}</Text>
                    </View>
                    <View style={[styles.profile,styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Tax </Text><Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.tax}</Text>
                    </View>
                    <View style={[styles.profile,styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Special Discount </Text><Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.special_discount}</Text>
                    </View>
                    <View style={[styles.profile,styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Total Amount </Text><Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.total_amount}</Text>
                    </View>
                    <View style={[styles.profile,styles.secondProfile, { width: width - 40, flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Amount Paid </Text><Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>{completedJobs?.invoice?.amount_paid}</Text>
                    </View>
                </View>
            </ScrollView>
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
    }
})

export default CompletedJobDetails
