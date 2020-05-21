import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Alert, FlatList, TouchableOpacity } from 'react-native';
import api from '../../service';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import FullScreenLoading from '../../components/FullScreenLoading';
import RepoIssuesItem from '../../components/RepoIssuesItem';

export default function RepoIssues({ url, isOpen, drawer }) {

  const[data, setData] = useState([]);
  const[loading, setLoading] = useState(true);
  const[page, setPage] = useState(1);
  const[itemsPerPage, setItemsPerPage] = useState(30);

  useEffect(() => {
    if(isOpen) handleIssues();
  }, []);
  
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
      // console.log(response.data);
      setLoading(false);
    })
    .catch(err => {
      Alert.alert('Oops!', 'Algo deu erro :(')
      setLoading(false);
    });
  }

  function handlePageChange(type) {
    if(page === 1 && type === 'prev') return;
    setPage(page => type === 'next' ? ++page : --page);
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
            style={styles.headerBackButton}
            activeOpacity={0.5}
            onPress={() => drawer.closeDrawer()}
          >
            <MaterialIcons name="keyboard-backspace" size={30} style={{ color: '#FFFFFF', opacity: 0.5 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Issues</Text>
        </View>
        <View style={styles.content}>
          <FlatList
            data={data}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={{paddingVertical: 10}}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            renderItem={({item}) => (
              <RepoIssuesItem data={item} />
            )}
            ListEmptyComponent={() => <FullScreenLoading iconColor="#FFFFFF" bgColor="#111111" />}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            activeOpacity={0.5}
            onPress={() => { handlePageChange('prev') }}
          >
            <Text style={styles.footerButtonText}>Prev. page</Text>
          </TouchableOpacity>
          <Text style={styles.footerPageIndicator}>{page}</Text>
          <TouchableOpacity
            style={styles.footerButton}
            activeOpacity={0.5}
            onPress={() => { handlePageChange('next') }}
          >
            <Text style={styles.footerButtonText}>Next page</Text>
          </TouchableOpacity>
        </View>      
      </View>
    );
  }
}