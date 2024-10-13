import React, { useState } from 'react'
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import api from '../utils/api'

export default function CreateRequest() {
  const navigation = useNavigation()
  const { user, accessToken } = useSelector((state) => state.auth.user)

  const [formData, setFormData] = useState({
    EnNumber: user?.EnNumber || '',
    email: user?.email || '',
    name: user?.name || '',
    number: user?.number || '',
    department: user?.department || '',
    reason: '',
    tg_batch: user?.tg_batch || '',
    parentNumber: user?.parentNumber || '',
  })

  const handleChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.reason.trim()) {
      Alert.alert('Error', 'Please provide a reason for your request.')
      return
    }

    try {
      const response = await api.post('/api/request/creat-request', {
        ...formData,
        accessToken: accessToken,
      })

      Alert.alert('Success', 'Request Created Successfully')
      navigation.navigate('StudDashboard')
    } catch (error) {
      console.error('Request Error:', error)
      Alert.alert('Request Failed', error.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create Request</Text>
        {Object.entries(formData).map(([key, value]) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
            </Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => handleChange(key, text)}
              editable={key !== 'parentNumber'}
              placeholder={`Enter ${key.replace('_', ' ')}`}
              placeholderTextColor="#999"
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 20
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})