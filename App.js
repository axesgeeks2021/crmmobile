import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './src/pages/splash/Welcome'
import Register from './src/pages/authentication/Register'
import Login from './src/pages/authentication/Login'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Availability from './src/pages/availability/Availability'
import DashBoard from './src/pages/dashboard/DashBoard'
import Orders from './src/pages/orders/Orders'

import BottomNavigation from "./src/components/BottomNavigation"
import About from './src/pages/profile/About'
import ChangePassword from './src/pages/profile/ChangePassword'
import ForgotPassword from './src/pages/profile/ForgotPassword'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CompletedJobs from './src/pages/orders/CompletedJobs'
import CompletedJobDetails from './src/pages/orders/CompletedJobDetails'
import SiteDocs from './src/pages/sitedocs/SiteDocs'
import UploadSiteDocs from './src/pages/sitedocs/UploadSiteDocs'
import Signature from './src/pages/Signature'
import Test from './src/pages/test/Test'

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='bottomNavigation' screenOptions={{ headerShown: true }}>
          <Stack.Screen name='bottomNavigation' component={BottomNavigation} options={{ headerShown: false }} />
          <Stack.Screen name='welcome' component={Welcome} options={{ title: 'Solar 365' }} />
          <Stack.Screen name='register' component={Register} options={{ title: 'Register' }} />
          <Stack.Screen name='login' component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name='availability' component={Availability} options={{ title: 'Create Availability' }} />
          <Stack.Screen name='dashboard' component={DashBoard} options={{ title: 'Dashboard' }} />
          <Stack.Screen name='order-detail' component={Orders} options={{ title: 'Order Details' }} />
          <Stack.Screen name='completed-jobs' component={CompletedJobs} options={{ title: 'Completed Jobs' }} />
          <Stack.Screen name='completed-jobs-details' component={CompletedJobDetails} options={{ title: 'Completed Job Details' }} />
          <Stack.Screen name='about' component={About} options={{ title: 'About' }} />
          <Stack.Screen name='site-docs' component={SiteDocs} options={{ title: 'Site Docs' }} />
          <Stack.Screen name='upload-site-docs' component={UploadSiteDocs} options={{ title: 'Upload Docs' }} />
          <Stack.Screen name='signature' component={Signature} options={{ title: 'Signature' }} />
          <Stack.Screen name='test' component={Test} options={{ title: 'Test' }} />
          <Stack.Screen name='change-password' component={ChangePassword} options={{ title: 'Change Password' }} />
          <Stack.Screen name='forgot-password' component={ForgotPassword} options={{ title: 'Forgot Password' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
