import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo';

import Global from '../stylesheets/global';

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.header__title}>✨ Dream Journal</Text>
        <Text style={styles.header__subtitle}>By: Emperor of Bluegaria</Text>
      </View>
      <TouchableOpacity style={styles.header__btn}>
        <Icon
          style={styles.header__icon}
          name="dots-three-vertical"
          size={20}
          color={Global.colors.primary[500]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 32,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: Global.colors.neutral[200],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  header__title: {
    color: Global.colors.neutral[800],
    fontSize: 20,
  },

  header__subtitle: {
    color: Global.colors.neutral[700],
    fontSize: 14,
  },

  header__icon: {
    color: Global.colors.neutral[900],
  },
});

export default Header;
