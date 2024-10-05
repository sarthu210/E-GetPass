import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ShowRequests = () => {
  // Sample gate pass request data following the schema
  const [sampleRequest, setSampleRequest] = useState({
    EnNumber: '12345',
    email: 'john.doe@example.com',
    name: 'John Doe',
    number: '9876543210',
    department: 'Computer Science',
    role: 'Student',
    reason: 'Visiting home for the weekend',
    teacherApproval: false,
    hodApproval: false,
    hostelApproval: false,
    securityApproval: false,
    isMessageSend: false,
    refreshToken: 'xyz123',
    date: new Date().toLocaleString(),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sample Gate Pass Request</Text>

      {/* Render Sample Request */}
      <Text style={styles.info}>Enrollment Number: {sampleRequest.EnNumber}</Text>
      <Text style={styles.info}>Email: {sampleRequest.email}</Text>
      <Text style={styles.info}>Name: {sampleRequest.name}</Text>
      <Text style={styles.info}>Number: {sampleRequest.number}</Text>
      <Text style={styles.info}>Department: {sampleRequest.department}</Text>
      <Text style={styles.info}>Role: {sampleRequest.role}</Text>
      <Text style={styles.info}>Reason: {sampleRequest.reason}</Text>
      <Text style={styles.info}>Teacher Approval: {sampleRequest.teacherApproval ? 'Approved' : 'Pending'}</Text>
      <Text style={styles.info}>HOD Approval: {sampleRequest.hodApproval ? 'Approved' : 'Pending'}</Text>
      <Text style={styles.info}>Hostel Approval: {sampleRequest.hostelApproval ? 'Approved' : 'Pending'}</Text>
      <Text style={styles.info}>Security Approval: {sampleRequest.securityApproval ? 'Approved' : 'Pending'}</Text>
      <Text style={styles.info}>Message Sent: {sampleRequest.isMessageSend ? 'Yes' : 'No'}</Text>
      <Text style={styles.info}>Date: {sampleRequest.date}</Text>

      <Button title="Refresh Data" onPress={() => setSampleRequest({ ...sampleRequest, date: new Date().toLocaleString() })} />
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
});

export default ShowRequests;
