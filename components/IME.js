import {StyleSheet, TextInput, View, Text} from 'react-native';

const IME = () => {
  return (
    <View>
        <Text>Input text here</Text>
      <TextInput
        style={styles.IMEStyle}
        placeholder='Text input'
      />
    </View>
  );
};

const styles = StyleSheet.create({
    IMEStyle: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default IME;