import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import background from '../assets/backgroundpng.png'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleValidation=()=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!email || !emailRegex.test(email)){
        Alert.alert("Invalid Email","Please Enter Valid Email Address")
        return false;
    }
    if(!password || password!=confirmPassword){
        Alert.alert("Password Required","Please Enter Password")
        return false;
    }
    if(!name){
        Alert.alert("Name Required","Please Enter Name")
        return false;
    }

    return true;
}

  const handlesignup =async () => {
   
   if(handleValidation()){
    try {
        const user=await auth().createUserWithEmailAndPassword(email, password);
        const userID= user.user.uid
        await firestore().collection('Users').doc(userID).set({
          name: name,
          email: email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate("Login")
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
      } catch (error) {
        // console.error(error);
        Alert.alert('Error', error.message);
      }
       
   }
  };
  
  const navigation= useNavigation()
  return (
    <ImageBackground
      source={background}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Please Signup to continue</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#d9d9d9"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#d9d9d9"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#d9d9d9"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#d9d9d9"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handlesignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
              <Text style={styles.signUpText}>Login</Text>
            </TouchableOpacity>
          </Text>
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
  subtitle: {
    fontSize: 16,
    color: '#fff',
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 15,
    paddingLeft: 20,
    borderRadius: 25,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
  },
  signUpText: {
    color: '#5C6BC0',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
