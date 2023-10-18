import { StatusBar, StyleSheet, NetInfo, Platform, Text, View } from 'react-native'
import Constants from 'expo-constants';
import React from 'react';

export default class Status extends React.Component {
   state = {
     info: null
   };

   render() {
      const {info} = this.state;

      const isConnected = info !== 'none';
      const backgroundColor = isConnected ? 'white': 'red';
      if(Platform.OS == 'ios') {
         return <View style={[styles.status, {backgroundColor}]}></View>
      } else {
         return null; //Temporary!
      }
   }
}

let statusHeight = (Platform.OS == 'ios' ? statusBarHeight : 0);

const styles = StyleSheet.create({
   status: {
     zIndex: 1,
     height: statusHeight,
     backgroundColor
   }
});