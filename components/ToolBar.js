import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import * as Location from 'expo-location';

const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);
ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default class Toolbar extends React.Component {
  static propTypes = {
    isFocused: PropTypes.bool,
    onChangeFocus: PropTypes.func,
    onSubmit: PropTypes.func,
    onPressCamera: PropTypes.func,
    onPressLocation: PropTypes.func,
  }
  static defaultProps = {
    onChangeFocus: () => {},
    onSubmit: () => {},
    onPressCamera: () => {},
    OnPressLocation: () => {}
  }
  state = {
    text: "",
  }
  handleChangeText = ( text) => {
    this.setState({ text })
  }
  handleSubmitEditing = () => {
    const { onSubmit } = this.props
    const { text } = this.state
    if (!text) return
    onSubmit(text)
    this.setState({ text: "" })
  }
  setInputRef = (ref) => {
    this.input = ref;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isFocused !== this.props.isFocused) {
      if (nextProps.isFocused) {
        this.input.focus();
      } else {
        this.input.blur()
      }
    }
  }
  handleFocus = () => {
    const { onChangeFocus } = this.props;
    onChangeFocus(true)
  }
  handleBlur = () => {
    const { onChangeFocus } = this.props;
    onChangeFocus(false)
  }
  handleOnPressLocation = async () => {
    const { onPressLocation} = this.props;
    const { status } = await Location.requestForegroundPermissionsAsync();
    if ( status !== 'granted'){
      console.log('Permission to access location was denied')
      return
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log({'latitude': location.coords.latitude, 
                'longitude': location.coords.longitude})
    onPressLocation({'latitude': location.coords.latitude, 
    'longitude': location.coords.longitude})
  }; 

  render() {
      const { onPressCamera, onPressLocation} = this.props;
      const { text } = this.state
      // console.log(OnPressLocation())
      return (
        <View style={styles.toolbar}>
          {/* <Text>😀</Text>  */}
          <ToolbarButton title={'📷'} onPress={onPressCamera} />
          <ToolbarButton title={'🗺'} onPress={this.handleOnPressLocation} />
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              underlineColorAndroid={'transparent'}
              placeholder={'Type something!'}
              blurOnSubmit={false}
              value={text}
              onChangeText={this.handleChangeText}
              onSubmitEditing={this.handleSubmitEditing}

              ref={this.setInputRef}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              />
          </View>
        </View>
      )
    }
  }

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alighItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  button: {
    top:-2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey',
  },
  inputContainer: {
    flex:1,
    flexDirection: 'row',
    borderWidth:1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 0, 0, 0.02)"

  },
  input: {
    flex:1,
    fontSize: 18
  }
})

// const Toolbar = () => {
//   return (
//     <View style={styles.toolbar}>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//     toolbar: {
//       backgroundColor: 'white',
//       borderTopWidth: 1,
//       borderTopColor: 'rgba(0,0,0,0.04)',
//     },
//   });

// export default Toolbar;