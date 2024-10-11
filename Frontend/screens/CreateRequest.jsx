import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function CreateRequest() {
    const [EnNumber, setEnNumber] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [department, setDepartment] = useState('');
    const [reason, setReason] = useState('');
    const [tg_batch, setTgBatch] = useState('');
  
    const handleSubmit = async () => {
      try {
        const response = await api.post('/api/request', {
          EnNumber,
          email,
          name,
          number,
          department,
          reason,
          tg_batch,
        });
  
        Alert.alert('Success', 'Request Created Successfully');
        navigation.navigate('Dashboard'); // Navigate to Dashboard after successful request
      } catch (error) {
        console.error('Request Error:', error);
        Alert.alert('Request Failed', error.response?.data?.message || 'An error occurred');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Request</Text>
        <TextInput
          style={styles.input}
          placeholder="EnNumber"
          placeholderTextColor="#999"
          value={EnNumber}
          onChangeText={setEnNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Number"
          placeholderTextColor="#999"
          value={number}
          onChangeText={setNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          placeholderTextColor="#999"
          value={department}
          onChangeText={setDepartment}
        />
        <TextInput
          style={styles.input}
          placeholder="Reason"
          placeholderTextColor="#999"
          value={reason}
          onChangeText={setReason}
        />
        <TextInput
          style={styles.input}
          placeholder="TG Batch"
          placeholderTextColor="#999"
          value={tg_batch}
          onChangeText={setTgBatch}
        />
        <Button title="Submit Request" onPress={handleSubmit} />
      </View>
    );
}

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
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      color: 'black',
    },
  });