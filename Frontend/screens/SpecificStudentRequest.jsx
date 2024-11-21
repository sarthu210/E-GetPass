import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import api from '../utils/api';

function SpecificStudentRequest({ route }) {
  const { EnNumber } = route.params;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch requests based on student enrollment number
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.post('/api/request/get-requests-by-enrollment', { EnNumber: EnNumber });
        setRequests(response.data.data); // Assuming data contains list of requests for the student
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [EnNumber]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading requests...</Text>
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
      <Text style={styles.title}>Requests for {EnNumber}</Text>

      {requests.map((request) => (
        <View key={request._id} style={styles.requestContainer}>
          <Text style={styles.info}>Reason: {request.reason}</Text>
          <Text style={styles.info}>Teacher Approval: {request.teacherApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>HOD Approval: {request.hodApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Hostel Approval: {request.hostelApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Security Approval: {request.securityApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Message Sent: {request.isMessageSend ? 'Yes' : 'No'}</Text>
          <Text style={styles.info}>Date: {new Date(request.date).toLocaleString()}</Text>
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
  requestContainer: {
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

export default SpecificStudentRequest;
