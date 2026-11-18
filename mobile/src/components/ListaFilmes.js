import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import CartaoFilme from './CartaoFilme'
import formataNota from '../utils/formatacao'

export default function ListaFilmes({titulo, filmes}) {
  return (
    <View style={styles.view}>
        <Text style={styles.titulo}>
            {titulo}
        </Text>
        
        <FlatList
            style={styles.lista}
            data={filmes}
            renderItem={({item}) => 
                <CartaoFilme
                    titulo={item.titulo}
                    ano={item.ano}
                    nota={formataNota(item.nota)}
                    poster={item.poster}   
                />}
            keyExtractor={item => item.id.toString()}
        />
    </View>
  )
}

const styles = StyleSheet.create ({
    titulo: {
        fontWeight: 'bold',
        textAlign: "center",
        color: "white",
        marginBottom: 15
    },

    view: {
        flex: 1,
        width: "100%",
    },

    lista: {
        flex: 1,
        width: "100%",
    },
})