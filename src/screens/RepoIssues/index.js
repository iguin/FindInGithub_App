import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Alert, FlatList, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import api from '../../service';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import FullScreenLoading from '../../components/FullScreenLoading';
import RepoIssuesItem from '../../components/RepoIssuesItem';

export default function RepoIssues({ url, isOpen, drawer }) {

  const[data, setData] = useState([]);
  const[loading, setLoading] = useState(true);
  const[loadingPage, setLoadingPage] = useState(false);
  const[path, setPath] = useState('');
  const[page, setPage] = useState(1);
  const[itemsPerPage] = useState(15);
  const[issuesState, setIssuesState] = useState('open');
  const[switchEnable, setSwitchEnable] = useState(false);
  const[flatRef, setFlatRef] = useState();

  useEffect(() => {
    setPath(url.replace('{/number}', ''));  
    if(isOpen) {
      handleIssues();
    }
  }, [isOpen]);
  
  const handleIssues = (page = 1) => {   
    api.fetchURL(path, {
      params: {
        per_page: itemsPerPage,
        page: page,
        state: issuesState
      }
    })
    .then(response => {

      let responseData = data;

      responseData.push(...response.data);

      setData(responseData);
      // console.log(response.data);
      setLoading(false);
      setLoadingPage(false);
    })
    .catch(err => {
      Alert.alert('Oops!', 'Algo deu erro :(')
      setLoading(false);
      setLoadingPage(false);
    });
  };

  const toggleSwitch = () => {
    // Set Issues state
    const state = switchEnable ? 'open' : 'closed';

    setIssuesState(state);
    setSwitchEnable(previousState => !previousState);

    api.fetchURL(path, {
      params: {
        per_page: itemsPerPage,
        page: page,
        state: state
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(err => {
      Alert.alert('Oops!', 'Algo deu erro :(')
    });
  }

  if(loading) {
    return (
      <FullScreenLoading iconColor="#FFFFFF" bgColor="#111111" />
    );
  } else {
    return(
      <View style={styles.container}>

        {/* HEADER */}
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

        {/* DATA CONTROLLS */}
        <View style={styles.dataControlls}>
          <Text style={styles.stateControllText}>Open</Text>
          <Switch
            trackColor={{ false: "#999999", true: "#999999" }}
            thumbColor={switchEnable ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={switchEnable}
          />
          <Text style={styles.stateControllText}>Closed</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <FlatList
            ref={_flat => setFlatRef(_flat)}
            data={data}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={{paddingVertical: 10}}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            renderItem={({item}) => (
              <RepoIssuesItem data={item} />
            )}
            ListEmptyComponent={() => <FullScreenLoading iconColor="#FFFFFF" bgColor="#111111" />}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              setLoadingPage(true);
              flatRef.scrollToEnd();
              let changePage = page;
              ++changePage;
              setPage(changePage);
              handleIssues(changePage);
            }}
            ListFooterComponent={() => !loadingPage ? (<></>) : (
              <View style={styles.moreIssues}>
                <ActivityIndicator
                  size='small'
                  color="#FFFFFF"
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}