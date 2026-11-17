import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'

export default class Creditos extends Component {
  render() {
    return (
      <View>
        <Text style={styles.creditos}>
            Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
    creditos: {
        fontSize: 18,
        textAlign: 'center',
        color: 'grey'
    }
})
