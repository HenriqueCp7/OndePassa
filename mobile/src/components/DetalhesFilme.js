import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Pressable, ScrollView } from 'react-native'
import backendClient from '../utils/backendClient'
import Carregando from './Carregando'
import {formatarNota, formatarDuracao} from '../utils/formatacao'
import Provedores from './Provedores'

export default function DetalhesFilme({ id, onVoltar }) {

  const [filme, setFilme] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const detalhaFilme = async () => {
      setCarregando(true)
      setErro(null)
      try {
        const resposta = await backendClient.get('/filme', {
          params: { id: id }
        })
        setFilme(resposta.data)
      } catch (erro) {
        if (erro.response && erro.response.data) {
          setErro(erro.response.data.mensagem)
        } else {
          setErro("Não foi possível carregar os detalhes.")
        }
      }
      setCarregando(false)
    }
    detalhaFilme()
  }, [id])

  let conteudo

  if (carregando) {
    conteudo = (
      <Carregando mensagem={"Carregando os detalhes..."} />
    )
  } else if (erro !== null) {
    conteudo = (
      <Text style={styles.textoErro}>{erro}</Text>
    )
  } else if (filme !== null) {
    let imagemFundo
    let imagemPoster

    if (filme.fundo) {
      imagemFundo = (
        <Image style={styles.fundo} source={{ uri: filme.fundo }} />
      )
    } else {
      imagemFundo = (
      <View style={styles.semFundo}>
        <Text style={styles.textoSemFundo}>Sem imagem de fundo</Text>
      </View>
      )
    }

    if (filme.poster === null) {
      imagemPoster = (
        <View style={styles.semPoster}>
          <Text style={styles.textoSemPoster}>Sem</Text>
          <Text style={styles.textoSemPoster}>pôster</Text>
        </View>
      )
    } else {
      imagemPoster = (
        <Image style={styles.poster} source={{ uri: filme.poster }} />
      )
    }

    const generos = filme.generos.join(' · ')
    const dados = [
      filme.ano,
      formatarDuracao(filme.duracao),
      generos
    ].filter(info => info !== null && info !== undefined && info !== '').join(' · ')

    let sinopse

    if (!filme.sinopse) {
      sinopse = "Sinopse indisponivel"
    } else {
      sinopse = filme.sinopse
    }

    let provedores
    let semProvedores = (filme.ondeAssistir.assinatura.length === 0 && filme.ondeAssistir.aluguel.length === 0 && filme.ondeAssistir.compra.length === 0)

    if (semProvedores) {
      provedores = (
        <Text style={styles.textoErro}>
          Este filme não está disponível em nenhum serviço no Brasil no momento.
        </Text>
      )
    } else {
      provedores = (
        <View>
          <Provedores titulo="Assinatura" provedores={filme.ondeAssistir.assinatura}/>
          <Provedores titulo="Aluguel" provedores={filme.ondeAssistir.aluguel}/>
          <Provedores titulo="Compra" provedores={filme.ondeAssistir.compra}/>
        </View>
      )
    }

    conteudo = (
      <ScrollView style={styles.scroll}>

        {imagemFundo}

        <View style={styles.direitaPoster}>
          {imagemPoster}
          <View style={styles.informacoes}>
            <Text style={styles.titulo}>{filme.titulo}</Text>
            <Text style={styles.dados}>{dados}</Text>
            <Text style={styles.nota}>{formatarNota(filme.nota)}</Text>
          </View>
        </View>
        
          <Text style={styles.tituloSinopse}>Sinopse</Text>
          <Text style={styles.sinopse}>{sinopse}</Text>

           <Text style={styles.textoOndeAssistir}>Onde assistir no Brasil</Text>
              {provedores}
          <Text style={styles.dadosJustWatch}>Dados de disponibilidade: JustWatch</Text>
      </ScrollView>
    )
  }

  return (
      <View style={styles.tela}>
        <Pressable style={styles.botaoVoltar} onPress={onVoltar}>
          <Text style={styles.textoVoltar}> {"<"} Voltar</Text>
        </Pressable>

        <View style={styles.conteudo}>
          {conteudo}
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    width: '100%'
  },

  botaoVoltar: {
    paddingVertical: 8,
    paddingTop: 7,
    marginBottom: 10
  },

  textoVoltar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },

  conteudo: {
    flex: 1
  },

  scroll: {
    flex: 1
  },

  textoErro: {
    color: 'white',
    textAlign: 'justify',
    lineHeight: 22
  },

  fundo: {
    height: 180,
    width: '100%',
    borderRadius: 10
  },

  semFundo: {
    height: 180,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },

  textoSemFundo: {
    textAlign: 'center',
    color: '#16162b'
  },

  areaPoster: {
    marginTop: 15
  },

  direitaPoster: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    marginBottom: 15
  },

  poster: {
    height: 150,
    width: 100,
    borderRadius: 10
  },

  semPoster: {
    height: 150,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 10
  },

  textoSemPoster: {
    textAlign: 'center',
    color: '#16162b'
  },

  informacoes: {
    marginTop: 15,
    flex: 1,
    minWidth: 0,
    marginLeft: 15
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'left',
    color: 'white',
    marginBottom: 8
  },

  dados: {
    color: 'white',
    marginBottom: 8
  },

  nota: {
    color: 'yellow'
  },

  tituloSinopse: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 8
  },

  sinopse: {
    color: 'white',
    lineHeight: 22,
    textAlign: 'justify' 
  },

  dadosJustWatch: {
    color: 'grey',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 7
  },

  textoOndeAssistir: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 15
  }
})