import { StyleSheet, Text, View } from 'react-native';
import Status from './components/StatusBar';
import Toolbar from './components/ToolBar';
import IME from './components/IME';
import React from 'react';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Status></Status>
        <View style={styles.content}>
          <Text>Neal Barton James J. Matira</Text>
          <IME>
          </IME>
          <Toolbar></Toolbar>  
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
