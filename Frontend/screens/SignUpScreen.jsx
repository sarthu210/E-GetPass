import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../slice/userSlice';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

const tgBatchOptions = {
  'Computer Science': {
    BE: ['CSE_BE_TG1', 'CSE_BE_TG2', 'CSE_BE_TG3'],
    TY: ['CSE_TY_TG1', 'CSE_TY_TG2', 'CSE_TY_TG3'],
    SY: ['CSE_SY_TG1', 'CSE_SY_TG2', 'CSE_SY_TG3'],
    FY: ['CSE_FY_TG1', 'CSE_FY_TG2', 'CSE_FY_TG3'],
  },
  Electrical: {
    BE: ['ELE_BE_TG1', 'ELE_BE_TG2', 'ELE_BE_TG3'],
    TY: ['ELE_TY_TG1', 'ELE_TY_TG2', 'ELE_TY_TG3'],
    SY: ['ELE_SY_TG1', 'ELE_SY_TG2', 'ELE_SY_TG3'],
    FY: ['ELE_FY_TG1', 'ELE_FY_TG2', 'ELE_FY_TG3'],
  },
  Mechanical: {
    BE: ['MECH_BE_TG1', 'MECH_BE_TG2', 'MECH_BE_TG3'],
    TY: ['MECH_TY_TG1', 'MECH_TY_TG2', 'MECH_TY_TG3'],
    SY: ['MECH_SY_TG1', 'MECH_SY_TG2', 'MECH_SY_TG3'],
    FY: ['MECH_FY_TG1', 'MECH_FY_TG2', 'MECH_FY_TG3'],
  },
  Civil: {
    BE: ['CIVIL_BE_TG1', 'CIVIL_BE_TG2', 'CIVIL_BE_TG3'],
    TY: ['CIVIL_TY_TG1', 'CIVIL_TY_TG2', 'CIVIL_TY_TG3'],
    SY: ['CIVIL_SY_TG1', 'CIVIL_SY_TG2', 'CIVIL_SY_TG3'],
    FY: ['CIVIL_FY_TG1', 'CIVIL_FY_TG2', 'CIVIL_FY_TG3'],
  },
  'Electronics And Telecomunication': {
    BE: ['ETC_BE_TG1', 'ETC_BE_TG2', 'ETC_BE_TG3'],
    TY: ['ETC_TY_TG1', 'ETC_TY_TG2', 'ETC_TY_TG3'],
    SY: ['ETC_SY_TG1', 'ETC_SY_TG2', 'ETC_SY_TG3'],
    FY: ['ETC_FY_TG1', 'ETC_FY_TG2', 'ETC_FY_TG3'],
  },
};

const SignupScreen = () => {
  const [enNumber, setEnNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [tg_batch, setTgBatch] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignup = async () => {
    console.log(enNumber, email, password, name, number, department, tg_batch, parentNumber, yearOfStudy);
    try {
      const response = await api.post('/api/sign-up', {
        role: 'student',
        EnNumber: enNumber,
        email: email,
        password: password,
        name: name,
        number: number,
        department: department,
        tg_batch: tg_batch,
        parentNumber: parentNumber,
        yearOfStudy: yearOfStudy,
      });

      const user = response.data.user;
      dispatch(login(response.data));

      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
      await AsyncStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));

      // Redirect to dashboard
      navigation.navigate('StudDashboard');
    } catch (error) {
      Alert.alert('Signup Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  const getTgBatchOptions = () => {
    if (department && yearOfStudy) {
      return tgBatchOptions[department][yearOfStudy] || [];
    }
    return [];
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

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={department}
          style={styles.picker}
          onValueChange={(itemValue) => setDepartment(itemValue)}
        >
          {!department && <Picker.Item label="Select Department" value="" />}
          <Picker.Item label="Computer Science" value="Computer Science" />
          <Picker.Item label="Electrical" value="Electrical" />
          <Picker.Item label="Mechanical" value="Mechanical" />
          <Picker.Item label="Civil" value="Civil" />
          <Picker.Item label="Electronics And Telecomunication" value="Electronics And Telecomunication" />
        </Picker>
      </View>
      
      <Text style={styles.label}>Year of Study</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={yearOfStudy}
          style={styles.picker}
          onValueChange={(itemValue) => setYearOfStudy(itemValue)}
        >
          {!yearOfStudy && <Picker.Item label="Select Year of Study" value="" />}
          <Picker.Item label="BE" value="BE" />
          <Picker.Item label="TY" value="TY" />
          <Picker.Item label="SY" value="SY" />
          <Picker.Item label="FY" value="FY" />
        </Picker>
      </View>
      
      <Text style={styles.label}>Select TG_Batch</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tg_batch}
          style={styles.picker}
          onValueChange={(itemValue) => setTgBatch(itemValue)}
        >
          {!tg_batch && <Picker.Item label="Select TG Batch" value="" />}
          {getTgBatchOptions().map((batch) => (
            <Picker.Item key={batch} label={batch} value={batch} />
          ))}
        </Picker>
      </View>
      
      <Text style={styles.label}>Parent's Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Parent's Phone Number"
        placeholderTextColor="#999"
        value={parentNumber}
        onChangeText={setParentNumber}
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
  pickerContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
});

export default SignupScreen;