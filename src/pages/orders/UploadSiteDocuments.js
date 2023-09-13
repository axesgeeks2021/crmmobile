import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import IconI from "react-native-vector-icons/Ionicons"
import { CameraScreen, Camera, CameraType } from 'react-native-camera-kit';

import Documents from '../../components/Documents';

import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

function UploadSiteDocuments({ route }) {

  const start = route.params.start

  const { width, height } = useWindowDimensions()

  const ref = useRef()

  const [isPermitted, setIsPermitted] = useState(false)
  const [captureImages, setCaptureImages] = useState([])

  const [value, setValue] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [cameraPhoto, setCameraPhoto] = useState('')

  const [showButton, setShowButton] = useState(false)

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission'
        },
      )
      return granted = PermissionsAndroid.RESULTS.GRANTED
    } catch (error) {
      console.log(error)
    }
  }

  const requestExternalWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "External Storage Write Permission",
          message: "Apps needs write permission"
        }
      )
      return granted = PermissionsAndroid.RESULTS.GRANTED
    } catch (error) {
      console.log(error)
    }
  }

  const requestExternalReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "External Storage Write Permission",
          message: "Apps needs write permission"
        }
      )
      return granted = PermissionsAndroid.RESULTS.GRANTED
    } catch (error) {
      console.log(error)
    }
  }

  const openCamera = async () => {
    // if (Platform.OS === 'android') {
    //     if (await requestCameraPermission()) {
    //         if (await requestExternalWritePermission()) {
    //             if (await requestExternalReadPermission()) {
    //                 setIsPermitted(true)
    //             } else alert('READ_EXTERNAL_STORAGE permission denied')
    //         } else alert('WRITE_EXTERNAL_STORAGE permission denied')
    //     } else alert('CAMERA permission denied')
    // } else {
    //     setIsPermitted(true)
    // }
    setIsCameraOpen(true)
  }

  const onBottomPressed = (event) => {
    const images = JSON.stringify(event.captureImages)
    if (event.type === 'left') {
      setIsCameraOpen(false)
    } else if (event.type == 'right') {
      setIsCameraOpen(false)
      setCaptureImages(images)
    } else {
      setCaptureImages(event.captureImages)
      // Alert.alert(
      //     event.type,
      //     images,
      //     [{ text: 'Ok', onPress: () => console.log('ok pressed') }],
      //     { cancelable: false }
      // )
      setIsCameraOpen(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: width, paddingHorizontal: 20, backgroundColor: '#003f91' }}>
        <Stopwatch
          laps
          msecs
          start={start}
        // To start
        // reset={resetStopwatch}
        // To reset
        // options={options}
        // Options for the styling
        // getTime={(time) => {
        // console.log(time);
        // }}
        />
      </View>
      {
        isCameraOpen ?
          <View style={{ flex: 1 }}>
            <CameraScreen style={{ flex: 1 }}
              actions={{
                rightButtonText: "Done",
                leftButtonText: "Cancel"
              }}
              onBottomButtonPressed={event => onBottomPressed(event)}
              captureButtonImage={require('../../assets/images/red2.png')}
            />
          </View> :
          <View>
            <View style={{ width: width, borderBottomWidth: 1, borderColor: 'black', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.box, { width: width / 4 }]}>
                <Icon name='home' size={60} color="#4B88A2" />
              </View>
              <View style={[styles.box, { width: width, }]}>
                {
                  captureImages.length < 1 ? <View>
                    <Text style={[styles.text]}>Start</Text>
                    <IconI name={value ? 'checkmark-done-sharp' : 'camera'} size={30} color="#5CB85C" onPress={openCamera} />
                  </View> : captureImages.map((ele, idx) => {
                    return (
                      <Image source={{ uri: ele?.uri }} resizeMode='cover' width={0} height={0} style={{ width: 100, height: 80 }} key={idx} />
                    )
                  })
                }
              </View>
            </View>
            <ScrollView scrollEventThrottle={16} onScroll={e => {
              const scrolling = e.nativeEvent.contentOffset.y
              if(scrolling > 100){
                return setShowButton(true)
              }
              if(scrolling < 100){
                return setShowButton(false)
              }
            }}>
              <Documents icon="camera-sharp" text="Photos" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Documents" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Meter" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Inverter" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
              <Documents icon="camera-sharp" text="Battery" iconcolor="#00acee" />
            </ScrollView>
            <View style={[styles.action, {width: width - 10,opacity: 1, transform: [{translateY: showButton ? 0 : 100}]}]}>
            <TouchableOpacity>
                <Text style={[styles.actionItem]}>Start Project</Text>
            </TouchableOpacity>
            </View>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default UploadSiteDocuments
