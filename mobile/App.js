import { StyleSheet, Text, View } from 'react-native';
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
import Busca from './src/components/Busca';

export default function App() {

  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)  
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)

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

  const buscaFilme = async () => {
    try {
      const resposta = await backendClient.get(`/filmes`, {
        params: {busca: termo}
      })

      setTermoBuscado(termo)
      setResultados(resposta.data.result)
      setErro(null)
      
    } catch(erro) {
      if(erro.response && erro.response.data) {
        setErro((erro.response.data.mensagem))
      } else {
        console.log("Não foi possível buscar os filmes")
      }
    }

  }

  const limpaBusca = () => {
    setTermo('')
    setResultados(null)
    setTermoBuscado(null)
    setErro(null)
  }

  let conteudo
  if(carregando) {
    conteudo = <Carregando mensagem="Buscando os filmes em alta..."/>
  } else if (erro) {
    conteudo = <Carregando mensagem={erro}></Carregando>
  } else if (resultados !== null && resultados.length === 0) {
    conteudo = <Text style={styles.text}>Nenhum filme encontrado para "{termoBuscado}"</Text>
  } else if (resultados !== null){
    conteudo = <ListaFilmes titulo={`Resultados para "${termoBuscado}"`} filmes={resultados}></ListaFilmes>
  } else {
    conteudo = <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta}/>
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.cabecalho}>
        <View style={styles.topo}>
          <Cabecalho/>

          <Busca 
            termo={termo}
            onTermoAlterado={setTermo}
            onBuscar={buscaFilme}
            onLimpar={limpaBusca}
          >
            <Carregando mensagem={"Procurando filmes..."}/>
          </Busca>
        </View>
        
        <View style={styles.conteudo}>
          {conteudo}
        </View>
              
        <Creditos/> 
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    flex: 1,
    width: '100%',
    backgroundColor: '#16162b',
    alignItems: 'center',
    padding: 20
  },

  topo: {
    width: '100%',
    gap: 20
  },

  conteudo: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'white'
  }
});
