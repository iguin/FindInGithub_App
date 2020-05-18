import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

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
          component={DetailsScreen} 
          options={ options }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
