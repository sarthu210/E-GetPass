import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [showStudentOptions, setShowStudentOptions] = useState(false);

  useEffect(() => {
    // Hide the back button on the Home screen
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Choose One</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="For Students"
          onPress={() => setShowStudentOptions(!showStudentOptions)}
        />
      </View>
      {showStudentOptions && (
        <View style={styles.studentOptions}>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('StudSignIn')}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Other Than Students"
          onPress={() => navigation.navigate('OtherSignIn')}
        />
      </View>
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
  buttonContainer: {
    marginBottom: 20,
  },
  studentOptions: {
    marginBottom: 20,
  },
});

export default HomeScreen;
