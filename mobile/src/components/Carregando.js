import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'


export default function Carregando({ mensagem='Carregando'}) {
    return (
        <View style={styles.alinhar}>
            <ActivityIndicator size= "large" color= "#E0473C"/>
            <Text style={styles.mensagem}>
                {mensagem}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    alinhar: {
        alignItems: "center",
        justifyContent: "center",
        gap: 15
    },

    mensagem: {
        color: 'white'
    }
})

