import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import global from '../stylesheets/global';

const Pages = ({pages}) => {
  const renderPage = ({item}) => {
    return (
      <TouchableOpacity style={styles.pages__page} activeOpacity={0.7}>
        <Text style={styles.pages__item}>{item.title}</Text>
        <Text style={styles.pages__item}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.pages}>
      <FlatList
        style={styles.pages__list}
        contentContainerStyle={styles.pages__listContainer}
        data={pages}
        keyExtractor={item => item.id}
        renderItem={renderPage}>
        <Text style={styles.pages__heading}>Recent Pages</Text>

        <Text style={styles.pages__heading}>Testers</Text>
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  pages: {
    backgroundColor: global.colors.neutral[200],
    flex: 1,
  },

  pages__heading: {
    fontSize: 16,
    color: global.colors.neutral[900],
    fontWeight: '500',
  },

  pages__list: {
    padding: 8,
  },

  pages__listContainer: {},

  pages__page: {
    flexGrow: 1,
    backgroundColor: global.colors.neutral[300],
    borderWidth: 1,
    borderColor: global.colors.neutral[400],
    borderRadius: 2,
    padding: 2,
    width: '100%',
    marginBottom: 4,
  },

  pages__item: {
    color: global.colors.neutral[900],
  },
});

export default Pages;
