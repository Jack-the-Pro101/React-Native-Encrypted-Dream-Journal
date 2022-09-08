import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {v4 as uuid} from 'uuid';

import EditorNavbar from '../components/EditorNavbar';
import EditorTextarea from '../components/EditorTextarea';

const Editor = ({navigation, styles}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const updateState = (data, isMainText) => {
    if (isMainText) {
      setText(data);
    } else {
      setTitle(data);
    }
  };

  const getValue = isMainText => (isMainText ? text : title);

  const savePage = async () => {
    const wordCount = text.split(/ /g).length;
    const date = Date.now();

    await AsyncStorage.setItem(
      uuid(),
      JSON.stringify({
        title,
        text,
        wordCount,
        date,
        lastOpened: date,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <EditorNavbar navigation={navigation} save={savePage} />
      <EditorTextarea updateState={updateState} getValue={getValue} />
    </SafeAreaView>
  );
};

module.exports = Editor;
