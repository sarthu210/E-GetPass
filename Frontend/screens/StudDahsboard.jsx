import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';

export default function StudDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    id: '12345',
    department: 'IT',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [gatePassRequest, setGatePassRequest] = useState({
    reason: '',
    date: '',
    time: '',
  });

  const renderProfile = () => (
    <View style={styles.section}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.detail}>Email: {user.email}</Text>
      <Text style={styles.detail}>ID: {user.id}</Text>
      <Text style={styles.detail}>Department: {user.department}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEditProfile = () => (
    <View style={styles.section}>
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={user.department}
        onChangeText={(text) => setUser({ ...user, department: text })}
        placeholder="Department"
      />
      <TouchableOpacity style={styles.button} onPress={() => setIsEditing(false)}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGatePassRequest = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Create Gate Pass Request</Text>
      <TextInput
        style={styles.input}
        value={gatePassRequest.reason}
        onChangeText={(text) => setGatePassRequest({ ...gatePassRequest, reason: text })}
        placeholder="Reason for Gate Pass"
      />
      <TextInput
        style={styles.input}
        value={gatePassRequest.date}
        onChangeText={(text) => setGatePassRequest({ ...gatePassRequest, date: text })}
        placeholder="Date (YYYY-MM-DD)"
      />
      <TextInput
        style={styles.input}
        value={gatePassRequest.time}
        onChangeText={(text) => setGatePassRequest({ ...gatePassRequest, time: text })}
        placeholder="Time (HH:MM)"
      />
      <TouchableOpacity style={styles.button} onPress={() => alert('Gate Pass Requested!')}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>E-Gate Pass Dashboard</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'gatepass' && styles.activeTab]}
          onPress={() => setActiveTab('gatepass')}
        >
          <Text style={styles.tabText}>Gate Pass</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'profile' && (isEditing ? renderEditProfile() : renderProfile())}
      {activeTab === 'gatepass' && renderGatePassRequest()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4a90e2',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4a90e2',
  },
  tabText: {
    fontSize: 16,
    color: '#333333',
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});