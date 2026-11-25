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
        fontSize: 12,
        textAlign: 'center',
        color: 'grey',
        marginTop: 29,
        backgroundColor: '#16162b'
    }
})
