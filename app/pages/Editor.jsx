import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {v4 as uuid} from 'uuid';

import EditorNavbar from '../components/EditorNavbar';
import EditorTextarea from '../components/EditorTextarea';

const Editor = ({navigation, styles, route}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState(Date.now());

  let id;

  if (route.params?.page?.id != null) {
    id = route.params.page.id;

    useEffect(() => {
      (async () => {
        const storedData = JSON.parse(await AsyncStorage.getItem(id));

        setTitle(storedData.title);
        setText(storedData.text);
        setDate(storedData.date);
      })();
    }, []);
  }

  const updateState = (data, isMainText) => {
    if (isMainText) {
      setText(data);
    } else {
      setTitle(data);
    }
  };

  const getValue = isMainText => {
    return isMainText ? text : title;
  };

  const savePage = async () => {
    const wordCount = text.split(/ /g).length;

    id = id ?? uuid();

    await AsyncStorage.setItem(
      id,
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
