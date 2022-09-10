import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Pages from '../components/Pages';
import Navbar from '../components/Navbar';

const Home = ({navigation, styles}) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const savedPages = await AsyncStorage.multiGet(
        await AsyncStorage.getAllKeys(),
      );
      setPages(
        savedPages.sort(
          (a, b) => JSON.parse(b[1]).lastOpened - JSON.parse(a[1]).lastOpened,
        ),
      );
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <Header />

      <Pages pages={pages} setPages={setPages} navigation={navigation} />

      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

module.exports = Home;
