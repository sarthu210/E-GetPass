import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { login } from '../slice/userSlice';
import api from '../utils/api';
import CookieManager from '@react-native-cookies/cookies';

const OtherSignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Teacher'); // Default role
  const dispatch  = useDispatch();

  const handleSignIn = async () => {
    try {
      console.log(email, password, role);
      const response = await api.post('/api/sign-in', {
        email: email,
        password: password,
        role: role,
      });

      const user = response.data.user;

      dispatch(login(user));
      // Store tokens and user data
      const { refreshToken} = response.data.user;
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Sign In Error:', error);
      Alert.alert('Sign In Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
      <Text style={styles.label}>Role</Text>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Teacher" value="Teacher" style={styles.pickerItem} />
        <Picker.Item label="HOD" value="HOD" style={styles.pickerItem} />
        <Picker.Item label="Admin" value="Admin" style={styles.pickerItem} />
      </Picker>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    color: 'black', // Ensure the selected item text is black
  },
  pickerItem: {
    color: 'black', // Ensure the picker items text is black
  },
});

export default OtherSignIn;