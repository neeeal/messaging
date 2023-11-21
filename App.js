import { BackHandler, StyleSheet, Text, View } from 'react-native';
import Status from './components/StatusBar';
import Toolbar from './components/ToolBar';
import IME from './components/IME';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MesssageUtils';
import React from 'react';

state = {
  messages: [
    createImageMessage('https://unspash.it/300/300'), 
    createLocationMessage('World'), 
    createTextMessage('Hello'),
    createLocationMessage({
      longitude:37.78825,
      longitude:-122.4324
    })
  ]
}

handlePressMessage = () => {

}

renderMessageList = () => {
  const { messages } = this.state;
  return (
    <View style = {styles.content}>
      <MessageList messages={messages}
      onpressMessage={handlePressMessage}/>
    </View>
  )
}


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
