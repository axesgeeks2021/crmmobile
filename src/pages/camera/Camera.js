import { Alert, Image, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { CameraScreen, Camera, CameraType } from 'react-native-camera-kit';
import { SafeAreaView } from 'react-native-safe-area-context';


const Cameras = () => {

    const ref = useRef()

    const [isPermitted, setIsPermitted] = useState(false)
    const [captureImages, setCaptureImages] = useState([])

    console.log(captureImages)

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
        setIsPermitted(true)
    }

    const onBottomPressed = (event) => {
        const images = JSON.stringify(event.captureImages)
        if (event.type === 'left') {
            setIsPermitted(false)
        } else if (event.type == 'right') {
            setIsPermitted(false)
            setCaptureImages(images)
        } else {
            setCaptureImages(event.captureImages)
            // Alert.alert(
            //     event.type,
            //     images,
            //     [{ text: 'Ok', onPress: () => console.log('ok pressed') }],
            //     { cancelable: false }
            // )
            setIsPermitted(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                isPermitted ? (
                    <View style={{ flex: 1 }}>
                        <CameraScreen style={{ flex: 1 }}
                            actions={{
                                rightButtonText: "Done",
                                leftButtonText: "Cancel"
                            }}
                            onBottomButtonPressed={event => onBottomPressed(event)}
                            captureButtonImage={require('../../assets/images/red.jpg')}

                        />
                    </View>
                ) : (
                    <View>
                        <Text>React native camera kit</Text>
                        {/*<Text>Photo details : {captureImages}</Text>*/}
                        <TouchableOpacity onPress={openCamera} style={{ backgroundColor: 'black', width: "100%", justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>open camera</Text>
                        </TouchableOpacity>
                        <View style={{ width: "100%", height: 400, backgroundColor: 'lime' }}>
                        {
                            captureImages?.map((ele, idx) => {
                                return(
                                    <Image source={{uri: ele?.uri}} resizeMode='cover' width={0} height={0} style={{width: 400, height: 400}} key={idx}/>
                                )
                            })
                        }
                        </View>
                    </View>
                )
            }
            {/*<Text key={idx}>file:/{ele?.path}</Text>*/}
        </SafeAreaView>
    )
}

export default Cameras

const styles = StyleSheet.create({})
// {
//     captureImages.map((ele, idx) => {
//         return (
//             <Image source={{uri: ele?.uri}} key={idx} resizeMode='cover' />
//         )
//     })
// }