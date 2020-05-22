import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';
import { MaterialIcons, Feather, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import FullScreenLoading from '../../components/FullScreenLoading';
import api from '../../service';
import { styles } from './styles';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import RepoIssues from '../RepoIssues';

export default function RepoDetails({ navigation, route }) {

  const[data, setData] = useState({});
  const[dataLoading, setDataLoading] = useState(true);
  const[drawer, setDrawer] = useState();
  const[drawerOpen, setDrawerOpen] = useState(false);

  useEffect(()=> {

    api.fetchURL(route.params.repo)
    .then(response => {
      setData(response.data);
      // console.log(response.data);
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
      <DrawerLayout
        drawerWidth={Dimensions.get('window').width}
        drawerPosition="right"
        drawerType="slide"
        renderNavigationView={() => <RepoIssues url={ data.issues_url } isOpen={drawerOpen} drawer={drawer} />}
        edgeWidth={Dimensions.get('window').width / 2}
        ref={(_drawer) => setDrawer(_drawer)}
        onDrawerOpen={() => setDrawerOpen(true)}
        drawerLockMode={data.open_issues_count !== 0 ? 'unlocked': 'locked-open'}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity
                style={ styles.headerButton }
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <MaterialIcons name="keyboard-backspace" size={25} style={{ color: '#FFFFFF' }} />
              </TouchableOpacity> 
              <View style={styles.headerText}>
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
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => drawer.openDrawer()}
                activeOpacity={0.8}
                disabled={!data.open_issues_count !== 0}
              >
                <FontAwesome name="comments" size={25} style={{
                  color: '#FFFFFF',
                  opacity: data.open_issues_count !== 0 ? 1 : 0.2,
                }} />
                <Text style={styles.badge}>{data.open_issues_count}</Text>
              </TouchableOpacity> 
            </View>
          </View>
          
          <View style={styles.content}>
            <View style={styles.mainDateItem}>
              <Text style={styles.dateItemTitle}>Created at</Text>
              <Text style={styles.dataItemContent}>{formatDateAndHours(data.created_at)}</Text>
            </View>
            <View style={styles.moreInfo}>
              <View style={styles.infoBox}>
                <FontAwesome5 name="eye" size={30} color="#FFFFFF" style={styles.infoIcon}/>
                <Text style={styles.infoTitle}>Watchers</Text>
                <Text style={styles.infoValue}>{data.watchers}</Text>
              </View>
              <View style={styles.infoBox}>
                <Entypo name="flow-branch" size={30} color="#FFFFFF" style={styles.infoIcon}/>
                <Text style={styles.infoTitle}>Forks</Text>
                <Text style={styles.infoValue}>{data.forks}</Text>
              </View>
              <View style={styles.infoBox}>
                <FontAwesome name="comments" size={25} color="#FFFFFF" style={styles.infoIcon}/>
                <Text style={styles.infoTitle}>Issues</Text>
                <Text style={styles.infoValue}>{data.open_issues_count}</Text>
              </View>
              <View style={styles.infoBox}>
                <FontAwesome name="star" size={30} color="#FFFFFF" style={styles.infoIcon}/>
                <Text style={styles.infoTitle}>Stars</Text>
                <Text style={styles.infoValue}>{data.stargazers_count}</Text>
              </View>
            </View>
            
            <View style={styles.language}>
              <Text style={styles.languageTitle}>Language</Text>
              <Text style={styles.languageContent}>{data.language}</Text>
            </View>
            {
              data.description ?
              (
                <Text style={styles.description}>{data.description}</Text>
              ) : <></>
            }
            <View style={styles.repoDates}>
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

          <View style={styles.contentUtilities}>
            <View style={styles.contentUtilitiesItem}>
              <TouchableOpacity
                onPress={() => Linking.openURL(data.svn_url)}
                activeOpacity={0.8}
                style={styles.contentIcon}
              >
                <Feather name="link" size={25} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            {
              !data.homepage ? <></> : (
                <View style={styles.contentUtilitiesItem}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(data.homepage)}
                    activeOpacity={0.8}
                    style={styles.contentIcon}
                  >
                    <MaterialIcons name="web" size={25} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )
            }
            <View style={styles.contentUtilitiesItem}>
              <TouchableOpacity
                onPress={() => Linking.openURL(data.owner.html_url)}
                activeOpacity={0.6}
                style={styles.contentIcon}
              >
                <Feather name="github" size={25} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DrawerLayout>
    );
  }
}