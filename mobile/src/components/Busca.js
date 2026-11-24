import { Pressable, TextInput, StyleSheet, View, Text } from 'react-native'

export default function Busca({termo, onTermoAlterado, onBuscar, onLimpar }) {
    let limpar
    if(termo){
        limpar = <Pressable onPress={onLimpar}>
            <Text style={styles.text}>X</Text>
        </Pressable>
    }

  return (
    <View style={styles.view}>
        <TextInput 
            style={styles.textInput} 
            onChangeText={onTermoAlterado}
            value={termo}
            placeholder="Digite o título de um filme"
        />
        {limpar}
    <Pressable onPress={onBuscar}>
        <Text style={styles.text}>Buscar</Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create ({
    textInput: {
        color: "grey",
        flex: 1,
        minWidth: 0,
    },

    text: {
        color: "grey",
    },

    view: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 8
    }
})