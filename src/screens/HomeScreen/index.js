import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate('Details')} title="Details" />
    </View>
  );
}
