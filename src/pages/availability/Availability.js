import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Modal, useTheme, Appbar } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Time from '../../components/Time';
import GetLocationProfile from '../GetLocation';

const Availability = () => {

    const { width, height } = useWindowDimensions();

    const theme = useTheme()

    const [availableDates, setAvailableDates] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [createAvailableDates, setCreateAvailableDates] = useState([])
    const [date, setDate] = useState([])
    const [allStatus, SetAllStatus] = useState({})

    const closeModal = () => {
        setShowModal(false)
        setShowUpdateModal(false)
        setCreateAvailableDates([])
    }

    const handleAvailableDates = dates => {
        // const todayDate = new Date().toISOString().slice(0, 10)
        // const date = new Date()
        // console.log('today date', date.toString().split('T')[0])
        // const numberofdays = 7;
        // const nextdate = date.setDate(date.getDate() + numberofdays)
        // console.log('days after 7 days',new Date(nextdate))
        if (createAvailableDates.length > 7) {
            alert("You can't select more than 7 days")
            return
        }
        setCreateAvailableDates([...createAvailableDates, dates])
    }

    const fetchAddAvailability = async () => {
        try {

            const auth = await AsyncStorage.getItem('auth')
            const parseAuth = JSON.parse(auth)


            let dates = "";
            createAvailableDates.map(ele => {
                return dates += `${ele}, `
            })


            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${parseAuth?.token}`);
            
            const formdata = new FormData();
            formdata.append("username", parseAuth?.user?.admin?.user?.username);
            formdata.append("available_days", dates.substring(0, dates.length - 2));
            
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };
            
            fetch("http://solar365.co.in/add-availibility/", requestOptions)
              .then(response => response.json())
              .then(result =>{

                if(result?.error){
                    alert(result?.errors)
                    setCreateAvailableDates([])
                    return
                }

                setAvailableDates(result)
                setShowModal(false)
                return getAvailability()
              })
              .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    const updateAvailability = async () => {
        try {
            const auth = await AsyncStorage.getItem('auth')
            const parseAuth = JSON.parse(auth)

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${parseAuth?.token}`);

            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "available_days": createAvailableDates
            });

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`http://solar365.co.in/add-availibility/${parseAuth?.user?.admin?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result)
                    setDate(result)
                    setShowUpdateModal(false)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const getAvailability = async () => {
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

            const res = await fetch(`http://solar365.co.in/inst-avail/${parseAuth?.user?.admin?.user?.id}/`, requestOptions)
            const data = await res.json()

            if(data === undefined){
                return getAvailability()
            }

            // console.log('all dates data',data)
            SetAllStatus(data)
            setDate(data.available_days)
                // .then(response => response.json())
                // .then(result => {
                //     setDate(result)
                // })
                // .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    const openAddWorkingDays = () => {
        setShowModal(true)
        setCreateAvailableDates([])
    }


    useEffect(() => {
        const subscribe = getAvailability()

        return () => [subscribe]
    }, [])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Time />
            {/* <GetLocationProfile /> */}
            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: '600', color: theme.colors.green }}>Please select dates for next week appointments</Text>
                <View style={{ marginVertical: 20 }}>
                    {
                        !allStatus?.status ? <Button mode='contained' style={{ backgroundColor: theme.colors.darkGreen, borderRadius: 0 }} onPress={openAddWorkingDays}
                        >
                            Add Working Days
                        </Button> : null
                    }
                    {
                        allStatus?.status ? <Button mode='contained' style={{ backgroundColor: theme.colors.darkGreen, borderRadius: 0, margin: 4 }} onPress={() => setShowUpdateModal(true)}
                        >
                            Update Working Days
                        </Button> : null
                    }
                </View>
            </View>
            <View style={{ flex: 2, width, justifyContent: 'center', alignItems: 'center' }}>
               <Calendar style={{ borderColor: 'black', borderWidth: 1, width: width / 1.3 }} hideExtraDays={true} disableArrowLeft={true} onDayPress={day => handleAvailableDates(day.dateString)} 
                    markedDates={{
                        [date[0]?.date]: { selected: true, selectedColor: 'green', },
                        [date[1]?.date]: { selected: true, selectedColor: 'green', },
                        [date[2]?.date]: { selected: true, selectedColor: 'green', },
                        [date[3]?.date]: { selected: true, selectedColor: 'green', },
                        [date[4]?.date]: { selected: true, selectedColor: 'green', },
                        [date[5]?.date]: { selected: true, selectedColor: 'green', },
                        [date[6]?.date]: { selected: true, selectedColor: 'green', },
                    }}
              />
                
            </View>
            <Modal visible={showModal} transparent={false} style={{ backgroundColor: theme.colors.white }}>
                <View style={{
                    justifyContent: 'center', alignItems: "center", backgroundColor: theme.colors.white
                }}>
                    <Calendar style={{ borderColor: 'black', borderWidth: 1 }} hideExtraDays={true} disableArrowLeft={true} onDayPress={day => handleAvailableDates(day.dateString)} markedDates={{
                        [createAvailableDates[0]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[1]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[2]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[3]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[4]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[5]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[6]]: { selected: true, selectedColor: 'green', },
                    }} />
                    <Button
                        mode='contained'
                        style={{ width: width / 2 + 40, backgroundColor: theme.colors.darkGreen, borderRadius: 0, marginVertical: 10 }}
                        onPress={fetchAddAvailability}
                    >
                        Submit
                    </Button>
                    <Button
                        mode='contained'
                        style={{ width: width / 2 + 40, backgroundColor: theme.colors.darkGreen, borderRadius: 0, marginVertical: 10 }}
                        onPress={closeModal}
                    >
                        Close
                    </Button>
                </View>
            </Modal>
            <Modal visible={showUpdateModal} transparent={false} style={{ backgroundColor: theme.colors.white }}>
                <View style={{
                    justifyContent: 'center', alignItems: "center", backgroundColor: theme.colors.white
                }}>
                    <Calendar style={{ borderColor: 'black', borderWidth: 1 }} hideExtraDays={true} disableArrowLeft={true} onDayPress={day => handleAvailableDates(day.dateString)} markedDates={{
                        [createAvailableDates[0]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[1]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[2]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[3]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[4]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[5]]: { selected: true, selectedColor: 'green', },
                        [createAvailableDates[6]]: { selected: true, selectedColor: 'green', },
                    }} />
                    <Button
                        mode='contained'
                        style={{ width: width / 2 + 40, backgroundColor: theme.colors.darkGreen, borderRadius: 0, marginVertical: 10 }}
                        onPress={updateAvailability}
                    >
                        Submit
                    </Button>
                    <Button
                        mode='contained'
                        style={{ width: width / 2 + 40, backgroundColor: theme.colors.darkGreen, borderRadius: 0, marginVertical: 10 }}
                        onPress={closeModal}
                    >
                        Close
                    </Button>
                </View>
            </Modal> */}
        </View>
    )
}

const styles = StyleSheet.create({})

export default Availability
