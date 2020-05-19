import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';

export default function UserReposListItem({ repo, navigation }) {
  return(
    <TouchableOpacity
      style={ styles.container }
      onPress={() => navigation.navigate('RepoDetails', {
        repo: repo.url
      })}
      activeOpacity={0.8}
    >
      <Text style={ styles.text }>{
        repo.name.length <= 20 ?
        repo.name :
        `${repo.name.substr(0, 20)}...`
      }</Text>
      <FontAwesome
        name="folder-open"
        size={18}
        color="#FFFFFF"
        style={ styles.icon }
      />
    </TouchableOpacity>
  );
} 