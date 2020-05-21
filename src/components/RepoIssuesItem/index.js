import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

export default function RepoIssuesItem({ data }) {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: data.user.avatar_url}}
        style={styles.avatar}
      />
      <View style={styles.description}>
        <Text style={styles.username}>{data.user.login}</Text>
        <Text style={styles.title}>{data.title}</Text>
      </View>
    </View>
  );
}