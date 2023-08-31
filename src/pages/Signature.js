import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useRef, useState } from 'react'
import Signature from "react-native-signature-canvas";
import { TextInput } from 'react-native-paper';


const Signatures = () => {

    const ref = useRef()

    const [signatureData, setSignatureData] = useState("")
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')

    console.log('sign',signatureData)

    const handleOK = (signature) => {
        // console.log(signature);
        setSignatureData(signature)
        // onOK(signature); // Callback from Component props
    };

    const handleEmpty = () => {
        console.log("Empty");
    };

    const handleClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };
    return (
        <View style={{flex: 1,}}>
            <View style={{flex: 0.7}}>
         <Signature onOK={handleOK}  descriptionText='Arsenal' clearText='show off' confirmText='Sign Done' autoClear={true}      />
        {
            signatureData === "" ? null : <Button title='Preview' onPress={() => setShow(!show)}/>
        }
         </View>
         <View style={{flex: 0.3, width: '100%'}}>
            {
                show ? <Sign signatureData={signatureData} /> : null
            }
         </View>
        </View>
    )
}

const Sign = ({signatureData}) => {
    return(
        signatureData !== "" ? <Image source={{ uri: signatureData}} style={{ width:"100%", height:"100%", resizeMode: 'contain' }} /> : null
    )
}

const styles = StyleSheet.create({})

export default Signatures
