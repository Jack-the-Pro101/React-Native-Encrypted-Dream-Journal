import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import global from '../stylesheets/global';

const EditorTextarea = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const textInput = (text, setter) => {
    setter(text);
  };

  return (
    <View style={styles.editor}>
      <ScrollView>
        <TextInput
          placeholder="Page Title"
          selectionColor={global.colors.primary[70050]}
          style={styles.editor__title}
          value={title}
          onChangeText={text => textInput(text, setTitle)}
        />

        <TextInput
          style={styles.editor__main}
          selectionColor={global.colors.primary[70050]}
          value={text}
          onChangeText={text => textInput(text, setText)}
          multiline
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  editor: {
    backgroundColor: global.colors.neutral[200],
    flex: 1,
  },

  editor__title: {
    color: global.colors.neutral[900],
    paddingHorizontal: 12,
    fontWeight: 'bold',
    fontSize: 20,
  },

  editor__main: {
    paddingTop: 0,
    paddingHorizontal: 12,
    minHeight: Dimensions.get('window').height,
    color: global.colors.neutral[900],
    textAlignVertical: 'top',
  },
});

export default EditorTextarea;
