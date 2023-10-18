import { StyleSheet, Text, View } from 'react-native';
import Status from './components/StatusBar';
import Toolbar from './components/ToolBar';
import IME from './components/IME';

export default function App() {
  return (
    <>
      <Status></Status>
      <View style={styles.container}>
        <View style={styles.content}>
          <IME></IME>
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
