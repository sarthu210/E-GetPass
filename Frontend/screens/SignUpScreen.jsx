import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [enNumber, setEnNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [tgName, setTgName] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://your-api-url/signup', {
        EnNumber: enNumber,
        email: email,
        password: password,
        number: number,
        department: department,
        tgName: tgName,
        parentNumber: parentNumber,
        yearOfStudy: yearOfStudy,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to dashboard
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Signup Failed', error.response.data.message || 'An error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Signup</Text>
      
      <Text style={styles.label}>Enrollment Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Enrollment Number"
        placeholderTextColor="#999"
        value={enNumber}
        onChangeText={setEnNumber}
      />
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        placeholderTextColor="#999"
        value={number}
        onChangeText={setNumber}
      />
      
      <Text style={styles.label}>Department</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Department"
        placeholderTextColor="#999"
        value={department}
        onChangeText={setDepartment}
      />
      
      <Text style={styles.label}>TG Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter TG Name"
        placeholderTextColor="#999"
        value={tgName}
        onChangeText={setTgName}
      />
      
      <Text style={styles.label}>Parent's Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Parent's Phone Number"
        placeholderTextColor="#999"
        value={parentNumber}
        onChangeText={setParentNumber}
      />
      
      <Text style={styles.label}>Year of Study</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Year of Study"
        placeholderTextColor="#999"
        value={yearOfStudy}
        onChangeText={setYearOfStudy}
      />
      
      <Button title="Sign Up" onPress={handleSignup} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  label: {
    fontSize: 16,
    marginBottom: 5,
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
});

export default SignupScreen;