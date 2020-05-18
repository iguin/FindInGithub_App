import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

import { styles } from './styles';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={ styles.titleContainer }>
        <Text style={ styles.subTitle }>Find in</Text>
        <Text style={ styles.title }>Github</Text>
      </View>
      
      <Button onPress={() => navigation.navigate('Details')} title="Details" />
    </View>
  );
}
