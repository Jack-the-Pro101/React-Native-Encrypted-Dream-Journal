import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Pages from '../components/Pages';
import Navbar from '../components/Navbar';

const Home = ({navigation, styles}) => {
  const [pages, setPages] = useState([]);
  // const [recentPages, setRecentPages] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setPages(AsyncStorage.multiGet(await AsyncStorage.getAllKeys()));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <Header />

      <ScrollView>
        <Pages pages={pages} />
      </ScrollView>

      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

module.exports = Home;
