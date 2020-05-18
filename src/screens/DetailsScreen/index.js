import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <View>
      <Text>Details</Text>
      <Button onPress={() => navigation.goBack()} title="Go back" />
    </View>
  );
}
