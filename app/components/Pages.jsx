import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/Entypo';

import {format} from 'date-fns';

import global from '../stylesheets/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PageActionMenu = ({isActive, activeId, deactivate, setPages, pages}) => {
  const slideAnim = useRef(
    new Animated.ValueXY({x: 0, y: Dimensions.get('screen').height / 4}),
  ).current;

  const fadeInAnim = useRef(new Animated.Value(0)).current;

  const showTransition = useRef(
    new Animated.ValueXY({x: 0, y: Dimensions.get('screen').height}),
  ).current;

  const slideAnimation = Animated.timing(slideAnim, {
    toValue: 0,
    duration: 150,
    useNativeDriver: true,
  });

  const fadeInAnimation = Animated.timing(fadeInAnim, {
    toValue: 0.5,
    duration: 150,
    useNativeDriver: true,
  });

  const showTransitionAnimation = Animated.timing(showTransition, {
    toValue: 0,
    duration: 1,
    useNativeDriver: true,
  });

  if (isActive) {
    slideAnimation.start();
    fadeInAnimation.start();
    showTransitionAnimation.start();
  } else {
    slideAnimation.reset();
    fadeInAnimation.reset();
    showTransitionAnimation.reset();
  }

  const deletePage = async () => {
    setPages(pages.filter(page => page[0] !== activeId));
    deactivate();
    await AsyncStorage.removeItem(activeId);
  };

  return (
    <>
      <Animated.View
        style={{
          ...styles.pages__actionOverlay,
          transform: [{translateY: showTransition.y}],
          opacity: fadeInAnim,
        }}>
        <TouchableOpacity
          style={styles.pages__actionOverlayClick}
          onPress={() => deactivate()}
        />
      </Animated.View>
      <Animated.View
        style={{
          ...styles.pages__actionMenu,
          transform: [{translateY: slideAnim.y}],
        }}>
        <TouchableOpacity style={styles.pages__actionItem}>
          <Icon name="add-to-list" size={20} />
          <Text>Add to Folder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pages__actionItem}>
          <Icon name="pin" size={20} />
          <Text>Pin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pages__actionItem} onPress={deletePage}>
          <Icon name="trash" size={20} />
          <Text>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const Pages = ({pages, navigation, setPages}) => {
  const [currentActionMenuId, setCurrentActionMenuId] = useState('');
  const [actionMenuShown, setActionMenuShown] = useState(false);

  const setCurrentActionMenu = id => {
    setCurrentActionMenuId(id);
    setActionMenuShown(true);
  };

  const deactivateActionMenu = () => {
    setCurrentActionMenuId(null);
    setActionMenuShown(false);
  };

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
            <TouchableOpacity
              style={styles.pages__contextBtn}
              onPress={() => setCurrentActionMenu(id)}>
              <Icon
                name="dots-three-vertical"
                size={24}
                style={styles.pages__contextIcon}
              />
            </TouchableOpacity>
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

      <PageActionMenu
        isActive={actionMenuShown}
        activeId={currentActionMenuId}
        setPages={setPages}
        pages={pages}
        deactivate={deactivateActionMenu}
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
    position: 'relative',
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
  },

  pages__itemStat: {
    color: global.colors.neutral[500],
    fontSize: 12,
  },

  pages__actionOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    height: Dimensions.get('screen').height,
    transform: [{translateY: -50}],
  },

  pages__actionOverlayClick: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },

  pages__contextBtn: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{translateY: -16}],
    padding: 8,
  },

  pages__contextIcon: {
    color: global.colors.neutral[800],
  },

  pages__actionMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: global.colors.neutral[200],
    display: 'flex',
    elevation: 5,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: Dimensions.get('screen').height / 2,
    overflow: 'scroll',
  },

  pages__actionItem: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Pages;
