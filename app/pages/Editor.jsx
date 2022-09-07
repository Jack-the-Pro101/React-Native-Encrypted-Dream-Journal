import React from 'react';
import {SafeAreaView} from 'react-native';

import EditorNavbar from '../components/EditorNavbar';
import EditorTextarea from '../components/EditorTextarea';

const Editor = ({navigation, styles}) => {
  return (
    <SafeAreaView style={styles.root}>
      <EditorNavbar navigation={navigation} save={savePage} />
      <EditorTextarea />
    </SafeAreaView>
  );
};

module.exports = Editor;
