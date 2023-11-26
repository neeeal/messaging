import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

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
    OnPressLocation: PropTypes.func,
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
  render() {
      const { onPressCamera, OnPressLocation} = this.props;
      const { text } = this.state
      return (
        <View style={styles.toolbar}>
          {/* <Text>😀</Text>  */}
          <Text>📷</Text>
          <ToolbarButton title={''} onPress={onPressCamera} />
          <Text>🗺</Text>
          <ToolbarButton title={''} onPress={OnPressLocation} />
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
               {/* <Text>{"Kimberly B. Pangilinan"}</Text> */}
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