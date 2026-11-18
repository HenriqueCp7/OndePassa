import { StyleSheet } from 'react-native';
import {
SafeAreaProvider,
SafeAreaView,
} from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';
import { useEffect, useState } from 'react';
import Carregando from './src/components/Carregando';
import ListaFilmes from './src/components/ListaFilmes';
import backendClient from './src/utils/backendClient';

export default function App() {

  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)  
  const [erro, setErro] = useState(null)

  useEffect(() => {
      async function carregandoEmAlta(){
        try {
          const resposta = await backendClient.get(`/em-alta`)
          console.log(resposta.data)
          setEmAlta(resposta.data.result)
          setCarregando(false)
        } catch(erro) {
          console.log(erro)
          setCarregando(false)
          setErro("Não foi possível carregar os filmes")
        }
      }

      carregandoEmAlta()
  }, [])

  let conteudo
  if(carregando) {
    conteudo = <Carregando mensagem="Buscando os filmes em alta..."/>
  } else if (erro) {
    conteudo = <Carregando mensagem={erro}></Carregando>
  } else {
    conteudo = <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta}/>
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
          <Cabecalho/>
              {conteudo}
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
