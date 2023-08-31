import { StyleSheet, Text, View, useWindowDimensions, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import DocumentPicker, { types } from 'react-native-document-picker'
import Pdf from 'react-native-pdf'


const UploadSiteDocs = () => {

    const { width, height } = useWindowDimensions()

    const [file, setFile] = useState([])

    console.log(file)

    const handleFile = async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.allFiles],
                allowMultiSelection: true
            });

            setFile(response)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, width: width }}>
            <View style={{ width: width, flex: 0.2 }}>
                <Button onPress={handleFile} icon="file-document-edit" mode='contained' style={{ borderRadius: 0, width: width / 2, marginVertical: 5, marginHorizontal: 10, }}>
                    Add Docs
                </Button>
            </View>
            <ScrollView style={{ width: width, flex: 0.8, overflow: 'hidden' }}>
                    {
                        file && file.map((ele, idx) => {
                            return(
                                <Pdf trustAllCerts={false} key={idx}
                                    source={{uri: "https://www.africau.edu/images/default/sample.pdf"}}
                                    style={{width: width, height: height}}
                                />
                            )
                        })
                    }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})

export default UploadSiteDocs
