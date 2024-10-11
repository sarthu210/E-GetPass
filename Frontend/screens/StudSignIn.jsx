import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { login } from '../slice/userSlice';
import axios from 'axios';

const StudSignIn = ({ navigation }) => {
  const [enNumber, setEnNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      console.log("in handleSignIn");
      console.log(enNumber, email, password);
      const response = await api.post('/api/sign-in', {
        EnNumber: enNumber,
        email: email,
        password: password,
        role: 'student',
      });

      const user = response.data.user;
      dispatch(login(user));

      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      console.log(response.data);

      // Redirect to dashboard
      navigation.navigate('StudDashboard');
    } catch (error) {
      Alert.alert('Sign In Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Student Sign In</Text>
        <Text style={styles.subtitle}>Welcome back, please sign in to your account</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔢</Text>
          <TextInput
            style={styles.input}
            placeholder="Enrollment Number"
            placeholderTextColor="#999"
            value={enNumber}
            onChangeText={setEnNumber}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>✉️</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.icon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  showPasswordButton: {
    padding: 10,
  },
  signInButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
  },
});

export default StudSignIn;