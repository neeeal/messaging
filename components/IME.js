import {StyleSheet, TextInput, View, Text} from 'react-native';

const IME = () => {
  return (
    <View>
      <TextInput
        style={styles.IMEStyle}
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