import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, Alert, Button } from 'react-native';
import background from '../assets/backgroundpng.png'
import { useNavigation } from '@react-navigation/native';
const HomeScreen = ({route}) => {

const navigation= useNavigation()

  const { userId, name, email } = route.params;
  
  return (
    <ImageBackground
      source={background}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome {name} </Text>
          <Text style={styles.subtitle}>{email}</Text>
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Login")}}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '85%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    width: '90%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
