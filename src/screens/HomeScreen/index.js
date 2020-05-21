import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import api from '../../service';

import { styles } from './styles';
import UserListItem from '../../components/UserListItem';

export default function HomeScreen({ navigation }) {

  const[search, setSearch] = useState('');
  const[searchTimeout, setSearchTimeout] = useState(null);
  const[searchResults, setSearchResults] = useState({});
  const[searchLoading, setSearchLoading] = useState(false);
  const[status, setStatus] = useState({});

  useEffect(() => {
    handleStatus();
  }, [])

  const handleStatus = () => {
    api.getRateLimit()
    .then(response => {
      setStatus(response.data)
    })
    .catch(err => Alert.alert('Opps', 'Algo deu errado!'));
  };

  const handleSearch = (text) => {
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
          handleStatus();
          setSearchResults(response.data);
        })
        .catch(err => console.log(err))

        setSearchLoading(false);

      }, 700)
    );
  }

  const handleCleanInput = () => {
    setSearch('');
    setSearchResults({});
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={ styles.container }>
        <View style={styles.header}>
          <View style={ styles.titleContainer }>
            <Text style={ styles.subTitle }>Find in</Text>
            <Text style={ styles.title }>Github</Text>
          </View>
          <TouchableOpacity 
            style={styles.status}
            activeOpacity={0.5}
            onPress={() => handleStatus()}
          >
            <View style={styles.statusBox}>
              <Text style={styles.statusTitle}>Search</Text>
              <Text style={styles.statusValues}>{status.resources.search.remaining}/{status.resources.search.limit}</Text>
            </View>
            <View style={styles.statusBox}>
              <Text style={styles.statusTitle}>Core</Text>
              <Text style={styles.statusValues}>{status.resources.core.remaining}/{status.resources.core.limit}</Text>
            </View>
            <View style={styles.statusBox}>
              <Text style={styles.statusTitle}>Graphql</Text>
              <Text style={styles.statusValues}>{status.resources.graphql.remaining}/{status.resources.graphql.limit}</Text>
            </View>
          </TouchableOpacity>
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
          <Text style={ styles.footerText }>Find in Github 2020</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
