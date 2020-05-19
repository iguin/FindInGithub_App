import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import api from '../../service';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import UserReposListItem from '../../components/UserReposListItem';

export default function UserDetailsScreen({ route, navigation }) {

  const[data, setData] = useState({});
  const[repos, setRepos] = useState([{}]);
  const[dataLoading, setDataLoading] = useState(true);
  const[reposLoading, setReposLoading] = useState(true);

  useEffect(() => {

    // Get the param username from HomeScreen component
    const username = route.params.username;
    
    // Get the user informations and repositories
    api.getUser(username)
    .then(response => {
      setData(response.data);
      setDataLoading(false);
      handleRepos(response.data.repos_url);
    });

  }, []);

  // Load the user repositories
  async function handleRepos(url = data.url) {
    setReposLoading(true);

    await api.fetchURL(url)
    .then(response => setRepos(response.data))
    .catch(err => Alert.alert('Oops!', 'Algo deu errado'))

    setReposLoading(false);
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        {
          dataLoading ?
          (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
              style={{
                opacity: 0.3
              }}
            />
          )
          :
          (
            <View style={ styles.headerDesc }>
              <Image
                source={{ uri: data.avatar_url }}
                style={ styles.headerAvatar }
              />
              <Text style={ styles.headerTitle }>{data.login}</Text>
            </View>        
          )
        }
        <TouchableOpacity
          style={ styles.closeBtn }
          onPress={() => navigation.goBack()}
          activeOpacity={0.2}
        >
          <MaterialIcons name="keyboard-backspace" size={30} style={{ color: '#FFFFFF', opacity: 0.5 }} />
        </TouchableOpacity> 
      </View>
      
      <View style={ styles.userDescription }>
        <View style={ styles.descriptionItem }>
          <Text style={ styles.descriptionTitle }>
            Pub. Repos
          </Text>
          <Text style={ styles.descriptionText }>
            { data.public_repos }
          </Text>
        </View>

        <View style={ styles.descriptionItem }>
          <Text style={ styles.descriptionTitle }>
            Followers
          </Text>
          <Text style={ styles.descriptionText }>
            { data.followers }
          </Text>
        </View>

        <View style={ styles.descriptionItem }>
          <Text style={ styles.descriptionTitle }>
            Following
          </Text>
          <Text style={ styles.descriptionText }>
            { data.following }
          </Text>
        </View>
      </View>

      <View style={ styles.options }>
        <Text style={ styles.optionBtnText }>Repositories</Text>
      </View>

      {
        reposLoading ?
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
            renderItem={({ item }) => <UserReposListItem repo={ item } />}
            contentContainerStyle={ styles.flatList }
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )
      }
      
    </View>
  );
}
