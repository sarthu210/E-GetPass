import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudDashboard() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.user);
  const profile = data?.user;

  const renderDetailItem = (label, value) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  const handleLogout = async () => {
    // Clear AsyncStorage
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');

    // Dispatch logout action
    dispatch(logout());

    // Redirect to Home
    navigation.navigate('Home');
  };

  const handleRequestHistory = () => {
    navigation.navigate('RequestHistory');
  };

  const handlePendingRequests = () => {
    navigation.navigate('PendingRequests');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}></Text>
        </View>
        
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{profile?.name || "Name"}</Text>
          <Text style={styles.department}>{profile?.department}</Text>
        </View>

        <View style={styles.infoCard}>
          {renderDetailItem('Email', profile?.email)}
          {renderDetailItem('EnNumber', profile?.EnNumber)}
          {renderDetailItem('Phone', profile?.number || 'Not provided')}
          {renderDetailItem('TG Batch', profile?.tg_batch || 'Not assigned')}
        </View>

        <TouchableOpacity
          style={styles.createRequestButton}
          onPress={() => navigation.navigate('CreateRequest')}
        >
          <Text style={styles.createRequestButtonText}>Create Request</Text>
        </TouchableOpacity>

        <View style={styles.additionalButtonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.historyButton]}
            onPress={() => navigation.navigate('ReqStudHistory')}
          >
            <Text style={styles.buttonText}>Request History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.pendingButton]}
            onPress={() => navigation.navigate('PendingReqStud')}
          >
            <Text style={styles.buttonText}>Pending Requests</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2c3e50',
  },
  department: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  detailValue: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  createRequestButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createRequestButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  additionalButtonsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#4CAF50',
  },
  pendingButton: {
    backgroundColor: '#FFC107',
  },
  logoutButton: {
    backgroundColor: '#F44336',
  },
});