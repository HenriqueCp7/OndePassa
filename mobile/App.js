import { StyleSheet } from 'react-native';
import {
SafeAreaProvider,
SafeAreaView,
} from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
          <Cabecalho/>
        
          <Creditos/> 
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#0E0E55',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20
  },
});
