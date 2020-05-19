import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import RepoDetails from '../screens/RepoDetails';

const Stack = createStackNavigator();
const options = {
  headerShown: false
};

export default function HomeRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={ options }
        />
        <Stack.Screen
          name="Details"
          component={UserDetailsScreen} 
          options={ options }
        />
        <Stack.Screen
          name="RepoDetails"
          component={RepoDetails} 
          options={ options }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
