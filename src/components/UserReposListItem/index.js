import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export default function UserReposListItem({ repo }) {
  return(
    <View style={ styles.container }>
      <Text style={ styles.text }>{
        repo.name.length <= 20 ?
        repo.name :
        `${repo.name.substr(0, 20)}...`
      }</Text>
    </View>
  );
} 