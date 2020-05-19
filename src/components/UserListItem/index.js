import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function UserListItem({ data, navigation }) {
  return (
    <TouchableOpacity
      style={ styles.container }
      onPress={() => navigation.navigate('Details', {
        username: data.login
      })}
      activeOpacity={0.2}
    >
      <View style={ styles.avatarContainer }>
        <Image
          source={{ uri: data.avatar_url }}
          style={ styles.avatar }
        />
      </View>
      <View style={ styles.userDescription }>
        <Text style={ styles.subDesc }>@</Text>
        <Text style={ styles.username }>{ data.login }</Text>
      </View>
    </TouchableOpacity>
  );
}