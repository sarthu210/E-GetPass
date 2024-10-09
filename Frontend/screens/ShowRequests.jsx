import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import api from '../utils/api';

const ShowRequests = () => {
  const [requests, setRequests] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch requests from the API when component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.post('/api/request/get-requests', {
          department: 'Computer Science'
        });
// Make sure this is an array
        setRequests(response.data.requests); // Set the requests data from response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

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

  if (!Array.isArray(requests)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No valid data received</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gate Pass Requests</Text>

      {requests.map((request) => (
        <View key={request._id} style={styles.requestContainer}>
          <Text style={styles.info}>Enrollment Number: {request.EnNumber}</Text>
          <Text style={styles.info}>Email: {request.email}</Text>
          <Text style={styles.info}>Name: {request.name}</Text>
          <Text style={styles.info}>Number: {request.number}</Text>
          <Text style={styles.info}>Department: {request.department}</Text>
          <Text style={styles.info}>Reason: {request.reason}</Text>
          <Text style={styles.info}>Teacher Approval: {request.teacherApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>HOD Approval: {request.hodApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Hostel Approval: {request.hostelApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Security Approval: {request.securityApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Message Sent: {request.isMessageSend ? 'Yes' : 'No'}</Text>
          <Text style={styles.info}>Date: {new Date(request.date).toLocaleString()}</Text>
        </View>
      ))}
      <View style={styles.Button}>
      <Button style={styles.Button} title="Refresh Data" onPress={async () => {
            try {
        const response = await api.post('/api/request/get-requests', {
          department: 'Computer Science'
        });
        setRequests(response.data.requests); // Set the requests data from response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
        }} />
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    height: '100%',
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
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  Button: {
    marginBottom: 30,
  }
});

export default ShowRequests;
