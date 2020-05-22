import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';

export default function UserListItem({ data, navigation, status }) {
  return (
    <TouchableOpacity
      style={ styles.container }
      onPress={() => {
        if(status.resources.core.remaining === 0) {
          const date = new Date(status.resources.core.reset * 1000);
          const reset = `${date.toDateString()} at ${date.toLocaleTimeString()} (UTC)`;
          Alert.alert(
            'Sorry dude 😔',
            `The Github API has a rate limit. Will reset in:\n${reset}`,
            [{
              text: 'Ok 😪',
              style: 'cancel'
            }]
          );
        } else {
          navigation.navigate('Details', {
            username: data.login
          });
        }
    }}
      activeOpacity={0.8}
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