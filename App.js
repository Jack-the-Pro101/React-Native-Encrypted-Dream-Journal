import React from 'react';

import Home from './app/pages/Home';
import Editor from './app/pages/Editor';

import {
  SafeAreaView,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import global from './app/stylesheets/global';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return <Home navigation={navigation} styles={styles} />;
};

const EditorScreen = ({navigation}) => {
  return <Editor navigation={navigation} styles={styles} />;
};

const Stacks = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Editor"
          component={EditorScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return <Stacks />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: global.colors.neutral[200],
  },
});

export default App;
