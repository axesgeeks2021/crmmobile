import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Platform } from 'react-native'

import { Appbar } from 'react-native-paper'

const MORE_ICON = Platform.OS = 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppBar = () => {
  return (
    <Appbar.Header style={{backgroundColor: "green"}}>
        <Appbar.Content title="Dashboard"  />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
  )
}

export default AppBar
