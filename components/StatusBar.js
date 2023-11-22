import { Constants } from "expo";
import { Platform, StatusBar, StyleSheet, Text, View, Animated } from "react-native";
import React, { Component,useRef, useEffect } from "react";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default class Status extends React.Component {
  state = {
    info: null,
    isConnected: true,
  };

  componentDidMount() {
    // Here you can use the NetInfo library to listen to network connectivity changes.
    // Make sure to install the '@react-native-community/netinfo' library and import it.

    setInterval(() => {
      this.handleConnectivityChange(false); // Simulate a disconnected state
    }, 5000);
  }


  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  };


  render() {

   // const checker = NetInfo.addEventListener(state => { // code for actual checking of connectivity
   //    state.isConnected ? this.state = true : this.state = null;
   // });

   // console.log(this.state)
   // console.log(this.isConnected)
 
    const { isConnected } = this.state;
    const backgroundColor = isConnected ? "yellow" : "pink";
    const statusAnimation = 'slide'
    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? "dark-content" : "light-content"}
        animated={true}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <FadeInView>
              <Text style={styles.text}>No network connection</Text>
            </FadeInView>
          </View>
        )}
      </View>
    );

    if (Platform.OS === "ios") {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {messageContainer}
        </View>
      );
    }

    return messageContainer;
  }
}

const statusHeight = Platform.OS == "ios" ? statusHeight : 0;

const styles = StyleSheet.create({
  messageContainer: {
    zIndex: 1,
    position: "absolute",
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: "center",
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
});