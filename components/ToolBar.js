import { View, StyleSheet, Text } from 'react-native';

const Toolbar = () => {
  return (
    <View style={styles.toolbar}>
      <Text>Toolbar</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    toolbar: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.04)',
    },
  });

export default Toolbar;