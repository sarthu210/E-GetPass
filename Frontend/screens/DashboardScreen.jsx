import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for Redux
import { logout } from '../slice/userSlice'; // Import the logout action

function DashboardScreen()  {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!isAuthenticated) {
        const userData = await AsyncStorage.getItem('user');
        if (!userData) {
          navigation.navigate('Home'); // Redirect to Home if not authenticated
        }
      }
    };

    checkAuthStatus();
  }, [isAuthenticated, navigation]);

  const handleLogout = async () => {
    // Clear AsyncStorage
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');

    // Dispatch logout action
    dispatch(logout());

    // Redirect to Home
    navigation.navigate('Home');
  };

  // If the user is not authenticated, show a message
  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user data found. Redirecting...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}!</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>User Name: {user.name}</Text>
      <Text style={styles.info}>Department: {user.department}</Text>
      <View style={styles.Button}>
      <Button title='Show Requests' onPress={() => navigation.navigate('showReq')} />
      </View>
      <Button title="Logout" onPress={handleLogout} />
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
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  Button: {
    marginBottom: 20,
  }
});

export default DashboardScreen;
