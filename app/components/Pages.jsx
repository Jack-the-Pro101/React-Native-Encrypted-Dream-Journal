import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {format} from 'date-fns';

import global from '../stylesheets/global';

const Pages = ({pages, navigation}) => {
  const renderPage = ({item, index}) => {
    try {
      const id = item[0];
      item = JSON.parse(item[1]);
      const date = new Date(item.date);

      return (
        <>
          {index === 0 ? (
            <Text style={styles.pages__heading}>Recent Pages</Text>
          ) : (
            ''
          )}
          <TouchableOpacity
            style={styles.pages__page}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Editor', {page: {id}});
            }}>
            <Text style={styles.pages__itemTitle}>{item.title}</Text>
            <Text style={styles.pages__itemPreview}>
              {item.text.slice(0, 42).replace(/\n/g, ' ') +
                (item.text.length > 42 ? '...' : '')}
            </Text>
            <View style={styles.pages__itemStats}>
              <Text style={styles.pages__itemStat}>
                {item.wordCount + (item.wordCount === 1 ? ' word' : ' words')}
              </Text>
              <Text style={styles.pages__itemStat}>
                {date.getFullYear() === new Date().getFullYear()
                  ? format(date, "MMM'.' d")
                  : format(date, "MMM'.' d y")}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      );
    } catch (err) {
      console.error(err);
      // console.log(pages);
    }
  };

  return (
    <View style={styles.pages}>
      <FlatList
        style={styles.pages__list}
        contentContainerStyle={styles.pages__listContainer}
        data={pages}
        keyExtractor={item => item[0]}
        renderItem={renderPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pages: {
    backgroundColor: global.colors.neutral[200],
    flex: 1,
  },

  pages__heading: {
    fontSize: 18,
    color: global.colors.neutral[800],
    fontWeight: '600',
    marginHorizontal: 12,
  },

  pages__list: {},

  pages__listContainer: {},

  pages__page: {
    flexGrow: 1,
    backgroundColor: global.colors.neutral[300],
    borderWidth: 1,
    borderColor: global.colors.neutral[400],
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 12,
  },

  pages__itemTitle: {
    color: global.colors.neutral[900],
    fontWeight: '600',
    marginBottom: 4,
  },

  pages__itemPreview: {
    color: global.colors.neutral[600],
    maxWidth: '100%',
    width: '100%',
    overflow: 'hidden',
  },

  pages__itemStats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 2,
    // borderTopWidth: 1,
    // borderTopColor: global.colors.neutral[400],
    // borderStyle: 'dashed',
  },

  pages__itemStat: {
    color: global.colors.neutral[500],
    fontSize: 12,
  },
});

export default Pages;
