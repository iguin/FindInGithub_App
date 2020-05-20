import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../service';
import { styles } from './styles';
import FullScreenLoading from '../../components/FullScreenLoading';

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

  function formatDate(str) {
    const date = new Date(str);
    return `${date.getDate()}/${date.getMonth() > 10 ? date.getMonth() : '0' + date.getMonth()}/${date.getFullYear()}`;
  }

  function formatHour(str) {
    const date = new Date(str);
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return `${hours}:${minutes}`;
  }

  function formatDateAndHours(str) {
    return `${formatDate(str)} - ${formatHour(str)}`;
  }

  if(dataLoading) {
    return (
      <FullScreenLoading iconColor="#FFFFFF" bgColor="#000000" />
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
          <View style={styles.subHeader}>
            <Text style={styles.headerSubtitle}>by</Text>
            <Image
              source={{ uri: data.owner.avatar_url}}
              style={styles.headerAvatar}
            />
            <Text style={styles.headerSubtitle}>{data.owner.login}</Text>
          </View>
        </View>
        <View style={styles.content}>
          {
            data.description ?
            (
              <Text style={styles.description}>{data.description}</Text>
            ) : <></>
          }
          <View style={styles.repoDates}>
            <View style={styles.dateItem}>
              <Text style={styles.dateItemTitle}>Created at</Text>
              <Text style={styles.dataItemContent}>{formatDateAndHours(data.created_at)}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateItemTitle}>Updated at</Text>
              <Text style={styles.dataItemContent}>{formatDateAndHours(data.updated_at)}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateItemTitle}>Pushed at</Text>
              <Text style={styles.dataItemContent}>{formatDateAndHours(data.pushed_at)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}