import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import Header from '../components/Header';
import Pages from '../components/Pages';
import Navbar from '../components/Navbar';

const Home = ({navigation, styles}) => {
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
