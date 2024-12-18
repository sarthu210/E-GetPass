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
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enNumberRegex = /^EN\d{8}$/i;
    const mobileRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }

    if (!enNumberRegex.test(enNumber)) {
      Alert.alert('Validation Error', 'Enrollment Number must start with "EN" followed by 8 digits.');
      return false;
    }

    if (!mobileRegex.test(number)) {
      Alert.alert('Validation Error', 'Phone number must be 10 digits.');
      return false;
    }

    if (!mobileRegex.test(parentNumber)) {
      Alert.alert('Validation Error', "Parent's phone number must be 10 digits.");
      return false;
    }

    if (!department || !yearOfStudy || !tg_batch) {
      Alert.alert('Validation Error', 'Please select all dropdown values.');
      return false;
    }

    return true;
  };

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    try {
      const response = await api.post('/api/send-otp', { email });
      if (response.data.message) {
        setOtpSent(true);
        Alert.alert(response.data.message);
      }
    } catch (error) {
      Alert.alert('OTP Send Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Validation Error', 'Please enter the OTP.');
      return;
    }

    try {
      const response = await api.post('/api/verify-otp', { email, otp });
      if (response.data.message) {
        setOtpVerified(true);
        Alert.alert('OTP Verified', 'Your email has been verified. You can now complete the signup process.');
      }
    } catch (error) {
      Alert.alert('OTP Verification Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;
    if (!otpVerified) {
      Alert.alert('Verification Required', 'Please verify your email with OTP before signing up.');
      return;
    }

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

      <Text style={styles.label}>Email</Text>
      <View style={styles.emailContainer}>
        <TextInput
          style={[styles.input, styles.emailInput, otpVerified && styles.disabledInput]}
          placeholder="Enter Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          editable={!otpVerified}
        />
        {otpVerified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified</Text>
          </View>
        )}
      </View>

      {!otpSent ? (
        <Button title="Send OTP" onPress={handleSendOtp} />
      ) : !otpVerified ? (
        <>
          <Text style={styles.label}>OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#999"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </>
      ) : (
        <>
          <Text style={styles.label}>Enrollment Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Enrollment Number"
            placeholderTextColor="#999"
            value={enNumber}
            onChangeText={setEnNumber}
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

          <Button title="Signup" onPress={handleSignup} />
        </>
      )}
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
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  emailInput: {
    flex: 1,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  verifiedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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

