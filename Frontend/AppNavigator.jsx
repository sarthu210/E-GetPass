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
import ApprovedRequests from './screens/ApprovedRequests';
import RequestByStudent from './screens/RequestsByStudents';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated, user} = useSelector((state) => state.auth);
  
  const AuthenticatedStack = () => (
    <Stack.Navigator initialRouteName={user?.user?.role === "student" ? "StudDashboard" : "Dashboard"}>
      <Stack.Screen name="StudDashboard" component={StudDashboard} options={{headerShown: false}} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="showReq" component={ShowRequests} />
      <Stack.Screen name="Approved" component={ApprovedRequests} />
      <Stack.Screen name="RequestByStudent" component={RequestByStudent} />
      <Stack.Screen name="CreateRequest" component={CreateRequest} />
    </Stack.Navigator>
  );

  const UnauthenticatedStack = () => (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="StudSignIn" component={StudSignIn} />
      <Stack.Screen name="OtherSignIn" component={OtherSignIn} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  </Provider>
);

export default App;
