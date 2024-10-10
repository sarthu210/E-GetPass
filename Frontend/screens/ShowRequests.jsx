import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/api';

function ShowRequests() {
  const [requests, setRequests] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

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
          <Text style={styles.info}>Teacher Approval: {request.teacherApproval ? <View style={styles.approve}><Text>Approved</Text></View> : <View style={styles.unapprove}><Text>Pending</Text></View>}</Text>
          <Text style={styles.info}>HOD Approval: {request.hodApproval ? <View style={styles.approve}><Text>Approved</Text></View> : <View style={styles.unapprove}><Text>Pending</Text></View>}</Text>
          <Text style={styles.info}>Hostel Approval: {request.hostelApproval ? <View style={styles.approve}><Text>Approved</Text></View> : <View style={styles.unapprove}><Text>Pending</Text></View>}</Text>
          <Text style={styles.info}>Security Approval: {request.securityApproval ? <View style={styles.approve}><Text>Approved</Text></View> : <View style={styles.unapprove}><Text>Pending</Text></View>}</Text>
          <Text style={styles.info}>Message Sent: {request.isMessageSend ? 'Yes' : 'No'}</Text>
          <Text style={styles.info}>Date: {new Date(request.date).toLocaleString()}</Text>
          <Button title="Approve" onPress={async () => {
            try {
              await api.post('/api/request/approve-request', {
                requestId: request._id,
                role : user.role
              });
              // Refresh the requests data
              const response = await api.post('/api/request/get-requests', {
                department: 'Computer Science'
              });
              setRequests(response.data.requests); // Set the requests data from response
            } catch (err) {
              setError(err.message);
            }
          } } />
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
    fontSize: 15,
    marginBottom: 8,
    color: 'black',
  },
  Button: {
    marginBottom: 30,
  },
  approve: {
    backgroundColor: 'green',
    padding: 2,
    borderRadius: 5,
  },
  unapprove: {
    backgroundColor: 'red',
    padding: 2,
    borderRadius: 5,
    color: 'white'
  },
});

export default ShowRequests;
