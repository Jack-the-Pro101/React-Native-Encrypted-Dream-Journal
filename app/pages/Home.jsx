import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Pages from '../components/Pages';
import Navbar from '../components/Navbar';

const Home = ({navigation, styles}) => {
  useEffect(() => {
    (async () => {
      console.log(
        await (
          await AsyncStorage.getAllKeys()
        ).forEach(async id => console.log(await AsyncStorage.getItem(id))),
      );
    })();
  });

  return (
    <SafeAreaView style={styles.root}>
      <Header />

      <ScrollView>
        <Pages />
      </ScrollView>

      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

module.exports = Home;
