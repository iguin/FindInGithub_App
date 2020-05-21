import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, TouchableOpacity } from 'react-native';
import api from '../../service';
import { styles } from './styles';
import FullScreenLoading from '../FullScreenLoading';

export default function RepoIssues({ url, isOpen, drawer }) {

  const[data, setData] = useState([]);
  const[loading, setLoading] = useState(true);
  const[page, setPage] = useState(1);
  const[itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if(isOpen)
      handleIssues();
  }, [isOpen]);

  function handleIssues() {
    const path = url.replace('{/number}', '');
    api.fetchURL(path, {
      params: {
        per_page: itemsPerPage,
        page: page,
      }
    })
    .then(response => {
      setData(response.data);
      setLoading(false);
    })
    .catch(err => {
      Alert.alert('Oops!', 'Algo deu erro :(')
      setLoading(false);
    });
  }

  if(loading) {
    return (
      <FullScreenLoading iconColor="#FFFFFF" bgColor="#111111" />
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => drawer.closeDrawer()}
          >
            <MaterialIcons name="keyboard-backspace" size={30} style={{ color: '#FFFFFF', opacity: 0.5 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Issues</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Text style={{color: 'white'}}>{item.title}</Text>
          )}
        />
      </View>
    );
  }
}