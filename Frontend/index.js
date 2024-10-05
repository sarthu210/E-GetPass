/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppNavigator from './AppNavigator'; // Adjust the path as necessary
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);