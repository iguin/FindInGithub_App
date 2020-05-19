import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import api from '../../service';

import { styles } from './styles';
import UserListItem from '../../components/UserListItem';

export default function HomeScreen({ navigation }) {

  const[searchTimeout, setSearchTimeout] = useState(null);
  const[searchResults, setSearchResults] = useState({});
  const[searchLoading, setSearchLoading] = useState(false);

  function handleSearch(text) {

    clearTimeout(searchTimeout);
    
    if(text.trim().length < 3) {
      setSearchResults({});
      return;
    }

    setSearchTimeout(
      setTimeout(async () => {
        setSearchLoading(true);

        await api.searchUser(text)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(err => console.log(err))

        setSearchLoading(false);

      }, 700)
    );
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.titleContainer }>
        <Text style={ styles.subTitle }>Find in</Text>
        <Text style={ styles.title }>Github</Text>
      </View>
      <View style={ styles.searchContainer }>
        <TextInput
          onChangeText={ text => handleSearch(text) }
          placeholder="Search..."
          style={ styles.searchInput }
        />
      </View>
      {
        searchLoading ?
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
            data={ searchResults.items }
            keyExtractor={ item => String(item.id) }
            renderItem={({ item }) => (
              <UserListItem 
                data={ item }
                navigation={ navigation }
              /> 
            )}
            ItemSeparatorComponent={() => <View style={{ height: 7 }} />}
            ListEmptyComponent={() => <Text style={ styles.waitingSearch }>...</Text>}
            contentContainerStyle={ styles.searchItems }
          />
        )
      }
      <View style={ styles.footer }>
        <Text style={ styles.footerText }>Find in Github&copy;.</Text>
      </View>
    </View>
  );
}
