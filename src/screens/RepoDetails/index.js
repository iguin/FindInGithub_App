import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../service';
import { styles } from './styles';

export default function RepoDetails({ navigation, route }) {

  const[data, setData] = useState({});
  const[dataLoading, setDataLoading] = useState(true);

  useEffect(()=> {
    
    api.fetchURL(route.params.repo)
    .then(response => {
      setData(response.data);
      setDataLoading(false);
    })
    .catch(err => Alert.alert('Oopss!', 'Algo deu errado'))

  }, []);

  if(dataLoading) {
    return (
      <View style={[ styles.container, {
        alignItems: 'center',
        justifyContent: 'center',
      } ]}>
        <ActivityIndicator size='large' color='#FFFFFF' />
      </View>
    );
  } else{
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={ styles.backButton }
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <MaterialIcons name="keyboard-backspace" size={25} style={{ color: '#FFFFFF' }} />
          </TouchableOpacity> 
          <Text style={styles.headerTitle}>{data.name}</Text>
        </View>
      </View>
    );
  }
}