import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import global from '../stylesheets/global';

const EditorNavbar = ({navigation, save}) => {
  const back = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        accessibilityLabel="Navigate back to home"
        onPress={() => back()}
        style={styles.navbar__backBtn}>
        <Icon name="arrow-back-ios" size={24} />
      </TouchableOpacity>

      <View style={styles.navbar__actionBtns}>
        <TouchableOpacity
          accessibilityLabel="Undo"
          style={styles.navbar__backBtn}>
          <Icon name="undo" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Redo"
          style={styles.navbar__backBtn}>
          <Icon name="redo" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Redo"
          style={styles.navbar__backBtn}
          onPress={save}>
          <Icon name="check" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
    backgroundColor: global.colors.neutral[200],
  },

  navbar__backBtn: {
    color: global.colors.neutral[900],
    padding: 16,
  },

  navbar__actionBtns: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default EditorNavbar;
