import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList } from 'react-native';
import api from '../../service';
import FullScreenLoading from '../FullScreenLoading';

export default function RepoIssues({ url }) {

  const[loading, setLoading] = useState(true);
  const[data, setData] = useState([]);
  const[page, setPage] = useState(1);
  const[itemsPerPage, setItemsPerPage] = useState(10);

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
      <View>
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