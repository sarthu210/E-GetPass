import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import api from '../utils/api';

function RequestByStudent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // Fetch student list when component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.post('/api/get-stud', {
            department: user?.department || null,
            role: user?.role || null,
            tg_batch: user?.tg_batch || null})
        setStudents(response.data.data); // Assuming data contains list of students
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading students...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Students</Text>

      {students.map((student) => (
        <View key={student._id} style={styles.studentContainer}>
          <Text style={styles.info}>Name: {student.name}</Text>
          <Text style={styles.info}>Email: {student.email}</Text>
          <Text style={styles.info}>Enrollment Number: {student.EnNumber}</Text>
          <Button
            title="Show Requests"
            onPress={() => navigation.navigate('StudentRequests', { EnNumber: student.EnNumber })}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  studentContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    fontSize: 15,
    marginBottom: 8,
    color: 'black',
  },
});

export default RequestByStudent;
