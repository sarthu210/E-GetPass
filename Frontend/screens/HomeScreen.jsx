import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const CustomButton = ({ title, onPress, color }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [showStudentOptions, setShowStudentOptions] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.title}>Welcome to E-Gate Pass</Text>
      <Text style={styles.subtitle}>Choose your role to continue</Text>
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title="For Students"
          onPress={() => setShowStudentOptions(!showStudentOptions)}
          color="#4A90E2"
        />
        
        {showStudentOptions && (
          <View style={styles.studentOptions}>
            <CustomButton
              title="Sign Up"
              onPress={() => navigation.navigate('Signup')}
              color="#2ECC71"
            />
            <CustomButton
              title="Sign In"
              onPress={() => navigation.navigate('StudSignIn')}
              color="#3498DB"
            />
          </View>
        )}
        
        <CustomButton
          title="Other Than Students"
          onPress={() => navigation.navigate('OtherSignIn')}
          color="#9B59B6"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  studentOptions: {
    marginTop: 10,
    marginBottom: 15,
  },
});

export default HomeScreen;