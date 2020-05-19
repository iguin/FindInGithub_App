import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function UserDetailsScreen({ route, navigation }) {

  const[data, setData] = useState({});

  useEffect(() => {
    setData(route.params.data);
  }, []);

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <View style={ styles.headerDesc }>
          <Image
            source={{ uri: data.avatar_url }}
            style={ styles.headerAvatar }
          />
          <Text style={ styles.headerTitle }>{data.login}</Text>
        </View>
        <TouchableOpacity
          style={ styles.closeBtn }
          onPress={() => navigation.goBack()}
        >
          <Text style={ styles.closeBtnText }>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
