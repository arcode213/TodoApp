import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'
import HomeScreen from './Screens/HomeScreen'
import ForgetPasswordScreen from './Screens/ForgetPasswordScreen'

const App = () => {
  const Stack= createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Signup' component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})