import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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
  const dispatch  = useDispatch();

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

      user = response.data.user;
      dispatch(login(user));

      AsyncStorage.setItem('user', JSON.stringify(user));
      AsyncStorage.setItem('accessToken', response.data.accessToken);
      AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      console.log(response.data);

      // Redirect to dashboard
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Sign In Failed', error.response.data.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enrollment Number"
        placeholderTextColor="#999"
        value={enNumber}
        onChangeText={setEnNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
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
          <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  showPasswordText: {
    color: '#007BFF',
  },
});

export default StudSignIn;