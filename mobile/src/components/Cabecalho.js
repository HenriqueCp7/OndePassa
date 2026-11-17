import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'

export default class Cabecalho extends Component {

  render() {
    return (
      <View>
        <Text style={styles.titulo}>
            🍿Onde Passa
        </Text>

        <Text style={styles.subtitulo}>
            Descubra onde assistir qualquer filme
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
    titulo: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        color: 'white'
    },

    subtitulo: {
        fontSize: 22,
        color: 'grey'
    }
})
