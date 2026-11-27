import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';
import Carregando from './src/components/Carregando';
import ListaFilmes from './src/components/ListaFilmes';
import backendClient from './src/utils/backendClient';
import Busca from './src/components/Busca';
import DetalhesFilme from './src/components/DetalhesFilme';

export default function App() {

  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)
  const [filmeSelecionado, setFilmeSelecionado] = useState(null)
  const [dica, setDica] = useState(null)
  const [buscando, setBuscando] = useState(false)

  async function carregandoEmAlta() {
    try {
      const resposta = await backendClient.get(`/em-alta`)
      console.log(resposta.data)
      setEmAlta(resposta.data)
    } catch (erro) {
      console.log(erro)
      setErro("Não foi possível carregar os filmes. Verifique se o backend está no ar.")
    }
    setCarregando(false)
  }

  useEffect(() => {
    carregandoEmAlta()
  }, [])

  useEffect(() => {
    let ativa = true

    if (!termo) {
      setDica(null)
      setResultados(null)
      setErro(null)
      carregandoEmAlta()
    } else if (termo.length === 1 || termo.length === 2) {
      setDica("Digite pelo menos 3 letras")
    } else if (termo.length >= 3) {
      setDica(null)
      const id = setTimeout(async () => {
        setBuscando(true)
        try {
          const resposta = await backendClient.get(`/filmes`, {
            params: { busca: termo }
          })
          if (!ativa) {
            return
          }
          setTermoBuscado(termo)
          setResultados(resposta.data)
          setErro(null)
        } catch (erro) {
          if (!ativa) {
            return
          }
          if (erro.response && erro.response.data) {
            setErro((erro.response.data.mensagem))
          } else {
            setErro("Não foi possível buscar os filmes")
          }
        }
        if (ativa) {
          setBuscando(false)
        }
      }, 600)

      return () => {
        setBuscando(false)
        ativa = false
        clearTimeout(id)
      }
    }
  }, [termo])


  const limpaBusca = () => {
    setTermo('')
    setResultados(null)
    setTermoBuscado('')
    setErro(null)
  }

  const selecionaFilme = (id) => {
    setFilmeSelecionado(id)
  }

  const voltaFilme = () => {
    setFilmeSelecionado(null)
  }

  let mensagemCarregando = "Buscando os filmes em alta..."
  if (emAlta.length === 0) {
    mensagemCarregando = "Procurando filmes..."
  }

  let conteudo
  if (carregando) {
    conteudo = <Carregando mensagem={mensagemCarregando} />
  } else if (erro) {
    conteudo = <Text style={styles.text}>{erro}</Text>
  } else if (resultados !== null && resultados.length === 0) {
    conteudo = <Text style={styles.text}>Nenhum filme encontrado para "{termoBuscado}".</Text>
  } else if (resultados !== null) {
    conteudo = <ListaFilmes titulo={`Resultados para "${termoBuscado}"`} filmes={resultados} onSelecionar={selecionaFilme} />
  } else {
    conteudo = <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} onSelecionar={selecionaFilme} />
  }

  let pensando = null
  if (buscando) {
    pensando = (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  let tela
  if (filmeSelecionado !== null) {
    tela =
      <View style={styles.telaDetalhes}>
        <DetalhesFilme id={filmeSelecionado} onVoltar={voltaFilme} />
      </View>
  } else {
    tela = (
      <>
        <View style={styles.buscaAlinhada}>
          <View style={{ flex: 4 }}>
            <Busca
              termo={termo}
              onTermoAlterado={setTermo}
              onLimpar={limpaBusca}
            />
          </View>

          <View style={styles.pensando}>{pensando}</View>
        </View>

        <Text style={styles.dica}>{dica}</Text>

        <View style={styles.conteudo}>
          {conteudo}
        </View>
      </>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.cabecalho}>
        <View style={styles.topo}>
          <Cabecalho />
        </View>

        {tela}

        <Creditos />
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
  },

  telaDetalhes: {
    flex: 1,
    width: '100%'
  },

  dica: {
    color: "white",
    marginTop: -10,
    marginBottom: 5,
  },

  pensando: {
    color: "white",
    alignItems: "center",
    marginBottom: 20,
    paddingLeft: 15,
    flex: 1
  },

  buscaAlinhada: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
  }
});