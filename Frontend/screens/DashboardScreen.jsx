import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slice/userSlice';

function DashboardScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!isAuthenticated) {
        const userData = await AsyncStorage.getItem('user');
        if (!userData) {
          navigation.navigate('Home');
        }
      }
    };

    checkAuthStatus();
  }, [isAuthenticated, navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
    navigation.navigate('Home');
  };

  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user data found. Redirecting...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={styles.title}>Welcome, {user.name}!</Text>
            {user.role === "hostel" ? null : <Text style={styles.subtitle}>{user.department}</Text>}
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoText}>{user.name}</Text>
          </View>
          {user.role === "hostel" ? null : <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Department:</Text>
            <Text style={styles.infoText}>{user.department}</Text>
          </View>
          }
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.showRequestsButton]}
            onPress={() => navigation.navigate('showReq')}
          >
            <Text style={styles.buttonText}>Show unapproved Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.showRequestsButton]}
            onPress={() => navigation.navigate('Approved')}
          >
            <Text style={styles.buttonText}>Approved Requests</Text>
          </TouchableOpacity>

        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, styles.showRequestsButton]}
            onPress={() => navigation.navigate('RequestByStudent')}
          >
            <Text style={styles.buttonText}>Request Data Per Student</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    width: 100,
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  showRequestsButton: {
    backgroundColor: '#3498db',
  },
  approvedRequestsButton: {
    backgroundColor: '#2ecc71',
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DashboardScreen;