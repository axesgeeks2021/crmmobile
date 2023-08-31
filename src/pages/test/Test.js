import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

import Pdf from 'react-native-pdf'

const Test = () => {

    const { width, height } = useWindowDimensions()

    // 'https://www.africau.edu/images/default/sample.pdf'
    const source = { uri: 'https://file-examples.com/storage/fead1d809b64e7bcd9ab4f1/2017/10/file-sample_150kB.pdf', cache: true };

    return (
        <View style={{ flex: 1, width: width, height: height, }}>
            <Pdf trustAllCerts={false}
                source={require('../../assets/SWMS.pdf')} style={{ flex: 1, width: width, height: height }} onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
            />
        </View>
    )
}

export default Test

const styles = StyleSheet.create({})