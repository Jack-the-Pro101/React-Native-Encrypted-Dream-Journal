import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/Entypo';

import global from '../stylesheets/global';

const Navbar = ({navigation}) => {
  return (
    <View style={styles.navbar}>
      {/* Navbar main btn */}

      <TouchableOpacity
        accessibilityLabel="New page"
        activeOpacity={0.7}
        style={styles.navbar__addBtn}
        onPressOut={() => navigation.navigate('Editor')}>
        <Icon name="plus" size={36} style={styles.navbar__addBtnIcon} />
      </TouchableOpacity>

      {/* Navbar items */}

      <TouchableOpacity style={styles.navbar__item}>
        <Icon name="clock" size={20} />
        <Text>Recent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbar__item}>
        <Icon name="folder" size={20} />
        <Text>Folders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: global.colors.neutral[200],
    elevation: 7,
    paddingVertical: 8,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  navbar__addBtn: {
    position: 'absolute',
    top: 0,
    left: Dimensions.get('window').width / 2,
    zIndex: 2,
    backgroundColor: global.colors.primary[500],
    width: 42,
    height: 42,
    borderRadius: 21,
    transform: [{translateY: -21}, {translateX: -21}],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  navbar__addBtnIcon: {
    color: global.colors.neutral[900],
  },

  navbar__item: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default Navbar;
