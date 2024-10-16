import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './screens/SignUpScreen'; // Adjust the path as necessary
import HomeScreen from './screens/HomeScreen';
import StudSignIn from './screens/StudSignIn';
import OtherSignIn from './screens/OtherSignIn';
import DashboardScreen from './screens/DashboardScreen'; 
import ShowRequests from './screens/ShowRequests';
import CreateRequest from './screens/CreateRequest';
import StudDashboard from './screens/StudDahsboard';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');
  };

  return (
    <Provider store={store}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Dashboard">
            {props => <DashboardScreen {...props} onLogout={handleLogout} />}
          </Stack.Screen>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="StudSignIn" component={StudSignIn} />
          <Stack.Screen name="OtherSignIn" component={OtherSignIn} />
          <Stack.Screen name="showReq" component={ShowRequests} />
          <Stack.Screen name="CreateRequest" component={CreateRequest} />
          <Stack.Screen
            name="StudDashboard"
            component={StudDashboard}
            options={{ headerShown: false }} // Hide the header
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default AppNavigator;