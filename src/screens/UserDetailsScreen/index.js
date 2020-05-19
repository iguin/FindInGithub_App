import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import api from '../../service';
import { styles } from './styles';

export default function UserDetailsScreen({ route, navigation }) {

  const[data, setData] = useState({});
  const[repos, setRepos] = useState([{}]);
  const[isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(route.params.data);
    handleRepos(route.params.data.repos_url);
  }, []);

  async function handleRepos(url) {
    setIsLoading(true);

    await api.fetchURL(url)
    .then(response => setRepos(response.data))
    .catch(err => Alert.alert('Oops!', 'Algo deu errado'))

    setIsLoading(false);
  }

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
      <View style={ styles.options }>
        <TouchableOpacity
          style={ styles.optionBtn }
          onPress={() => {}}
          activeOpacity={0.2}
        >
          <Text style={ styles.optionBtnText }>Repositories</Text>
        </TouchableOpacity>
      </View>
      {
        isLoading ?
        (
          <View style={ styles.searchLoading }>
            <ActivityIndicator
              size='large'
              color='#FFFFFF'
            />
          </View>
        )
        :
        (
          <FlatList
            data={ repos }
            keyExtractor={ item => String(item.id) }
            renderItem={({ item }) => (
              <Text style={{color: 'white'}}>{ item.full_name }</Text>
            )}
          />
        )
      }
      
    </View>
  );
}
