import { BackHandler, StyleSheet, Text, View, Image, TouchableHighlight, Alert,ImageBackground } from 'react-native';
import Status from './components/Statusbar';
import IME from './components/IME';
import Toolbar from './components/ToolBar';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';
import React, {useState} from 'react';
// import { ImageBackground } from 'react-native-web';
import * as Location from 'expo-location';
// import { navigator } from 'react-native-navigation';

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage('https://unsplash.it/500/500'), 
    createTextMessage('World'), 
    createTextMessage('Hello'),
    createTextMessage('Kimberly'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    })
  ]);
  

  const [fullscreenImageId, setFullscreenImageId] = useState(null);              

  const [isInputFocused, setIsInputFocused] = useState(false);  

  const handlePressToolbarCamera = () => {
    // ...
    };

    const handlePressToolbarLocation = async () => {
      console.log("App.js - handlePressToolbarLocation called");
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("Permission status:", status);
    
        if (status !== 'granted') {
          console.log('Permission to access location was denied.');
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        console.log("Location:", location);
        setMessages([...messages, createLocationMessage(location)]);
      } catch (error) {
        console.error("Error in handlePressToolbarLocation:", error);
      }
    };

    const handleChangeFocus = (isFocused) => {
    setIsInputFocused(isFocused);
    };

    const handleSubmit = (text) => {
      // Use the local 'messages' variable directly, no need for 'this.state'
      setMessages([...messages, createTextMessage(text)]);
    };

  const dismissFullscreenImage = () => {
    setFullscreenImageId(null);
  };
  
  const handlePressMessage = ({id, type}) => {
    switch (type) {
      case 'text':
        alertDelete(id)
        break
      case 'image':
        setFullscreenImageId(id)
        setIsInputFocused(false)
        break
      default:
        break
    }
  };

  const renderFullscreenImage = () => {
    
    if (!fullscreenImageId) return null;
    const image = messages.find (message => message.id === fullscreenImageId);
    if (!image) return null;
    const { uri } = image;
    
    return (
      <TouchableHighlight style={styles.fullscreenOverlay}
      onPress={dismissFullscreenImage}>
          <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    )
  }
  
  const renderMessageList = () => {
    // const { messages } = state;
    return (
      <MessageList messages={messages} onPressMessage={handlePressMessage} />
    );
  };
  
  const alertDelete = (id) => {
    Alert.alert('Delete Message', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteMessage(id);
        },
      },
    ]);
  };

  const deleteMessage = (id) => {
    // Create a new array without the message to be deleted
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  const renderToolbar = () => {
    // const { isInputFocused } = this.state;
    return (
    <View style={styles.toolbar}>
    <Toolbar
    isFocused={isInputFocused}
    onSubmit={handleSubmit}
    onChangeFocus={handleChangeFocus}
    onPressCamera={this.handlePressToolbarCamera}
    onPressLocation={handlePressToolbarLocation}
    /><Text>{" "}</Text>
    </View>
    );
    }

    
  return (
    <>
      <View style={styles.container}>
        <Status />
        <View style={styles.content}>
        <ImageBackground source={require('./assets/dreamy-clouds.png')} style={{height:'100%'}}>
          {/* <IME /> */}
          {renderMessageList()}
          {renderFullscreenImage()}
          {/* <Toolbar /> */}
          {renderToolbar()}
          </ImageBackground>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#abcdef',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullscreenOverlay: {
    height:'100%',
    width:'100%',
    backgroundColor: '#161616',
  },
  fullscreenImage: {
    flex:1,
    resizeMode: 'contain'
  }
});
