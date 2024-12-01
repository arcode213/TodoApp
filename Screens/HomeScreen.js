import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform, 
  Alert 
} from 'react-native';
import background from '../assets/backgroundpng.png';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { name, email } = route.params;

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      Alert.alert("Signed Out", "You have been signed out successfully.");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Sign Out Failed", error.message);
    }
  };

  return (
    <ImageBackground
      source={background}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome, {name}</Text>
          <Text style={styles.subtitle}>{email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
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
    paddingVertical: 20,
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
