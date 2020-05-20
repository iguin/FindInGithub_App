import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, TouchableOpacity } from 'react-native';
import api from '../../service';
import FullScreenLoading from '../FullScreenLoading';
import { styles } from './styles';

export default function RepoIssues({ url }) {

  const[loading, setLoading] = useState(true);
  const[data, setData] = useState([]);
  const[page, setPage] = useState(1);
  const[itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const path = url.replace('{/number}', '');
    api.fetchURL(path, {
      params: {
        per_page: itemsPerPage,
        page: page,
      }
    })
    .then(response => {
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    })
    .catch(err => {
      Alert.alert('Oops!', 'Algo deu erro :(')
      setLoading(false);
    })
  }, []);

  if(loading) {
    return(
      <FullScreenLoading iconColor="#FFFFFF" bgColor="#000000"/>
    );
  } else {
    return(
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Text style={{color: '#FFFFFF'}}>{ item.title }</Text>
          )}
          ItemSeparatorComponent={()=> <View style={{height: 15}} />}
        />
      </View>
    );
  }
}