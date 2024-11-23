import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import api from '../utils/api';
import { useSelector } from 'react-redux';

function PendingReqStud() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [branch, setBranch] = useState('');
  const [tgBatch, setTgBatch] = useState('');
  const [date, setDate] = useState('');
  const [searchName, setSearchName] = useState('');

  const data = useSelector((state) => state.auth);
  const EnNumber = data?.user?.user?.EnNumber;

  // Fetch requests based on student enrollment number
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.post('/api/request/get-requests-by-enrollment', { EnNumber });
        setRequests(response.data.data); // Assuming data contains list of requests for the student
        setFilteredRequests(response.data.data); // Initialize filteredRequests
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [EnNumber]);

  // Apply filters
  const applyFilters = () => {
    let updatedRequests = [...requests];

    if (branch) {
      updatedRequests = updatedRequests.filter((req) => req.branch?.toLowerCase() === branch.toLowerCase());
    }

    if (tgBatch) {
      updatedRequests = updatedRequests.filter((req) => req.tg_batch?.toLowerCase() === tgBatch.toLowerCase());
    }

    if (date) {
      updatedRequests = updatedRequests.filter(
        (req) => new Date(req.date).toLocaleDateString() === new Date(date).toLocaleDateString()
      );
    }

    if (searchName) {
      updatedRequests = updatedRequests.filter((req) =>
        req.name?.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredRequests(updatedRequests);
  };

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

      {/* Filters */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Branch"
          value={branch}
          onChangeText={setBranch}
        />
        <TextInput
          style={styles.input}
          placeholder="TG Batch"
          value={tgBatch}
          onChangeText={setTgBatch}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Search Name"
          value={searchName}
          onChangeText={setSearchName}
        />
        <Button title="Apply Filters" onPress={applyFilters} />
      </View>

      {/* Filtered Requests */}
      {filteredRequests.map((request) => request.securityApproval === false ? (
        <View key={request._id} style={styles.requestContainer}>
          <Text style={styles.info}>Reason: {request.reason}</Text>
          <Text style={styles.info}>Name: {request.name}</Text>
          <Text style={styles.info}>Branch: {request.branch}</Text>
          <Text style={styles.info}>TG Batch: {request.tg_batch}</Text>
          <Text style={styles.info}>Teacher Approval: {request.teacherApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>HOD Approval: {request.hodApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Hostel Approval: {request.hostelApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Security Approval: {request.securityApproval ? 'Approved' : 'Pending'}</Text>
          <Text style={styles.info}>Message Sent: {request.isMessageSend ? 'Yes' : 'No'}</Text>
          <Text style={styles.info}>Date: {new Date(request.date).toLocaleString()}</Text>
        </View>
      ) : null)}
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
  filterContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
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

export default PendingReqStud;
