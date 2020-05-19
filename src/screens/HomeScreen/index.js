import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import api from '../../service';

import { styles } from './styles';
import UserListItem from '../../components/UserListItem';

export default function HomeScreen({ navigation }) {

  const[search, setSearch] = useState('');
  const[searchTimeout, setSearchTimeout] = useState(null);
  const[searchResults, setSearchResults] = useState({});
  const[searchLoading, setSearchLoading] = useState(false);

  function handleSearch(text) {
    setSearch(text);

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

  function handleCleanInput() {
    setSearch('');
    setSearchResults({});
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={ styles.container }>
        <View style={ styles.titleContainer }>
          <Text style={ styles.subTitle }>Find in</Text>
          <Text style={ styles.title }>Github</Text>
        </View>
        <View style={ styles.searchContainer }>
          <TextInput
            onChangeText={ text => handleSearch(text) }
            value={search}
            placeholder="Search..."
            style={ styles.searchInput }
          />
          {
          search.trim().length > 0 ?
          (
            <TouchableOpacity
              style={ styles.cleanInput }
              onPress={() => handleCleanInput()}
              activeOpacity={0.8}
            >
              <Text style={ styles.cleanInputText }>x</Text>
            </TouchableOpacity>
          ): (<></>)
          }
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
            <>
              {
                searchResults.items ?
                (
                  <Text style={ styles.totalCount }>Total count: { searchResults.total_count }</Text>
                )
                :
                (<></>)
              }
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
            </>
          )
        }
        <View style={ styles.footer }>
          <Text style={ styles.footerText }>Find in Github&copy;.</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
