import { View, Text, StyleSheet } from 'react-native'

export default function Cabecalho() {

    return (
        <View>
            <Text style={styles.titulo}>
                🍿 OndePassa
            </Text>

            <Text style={styles.subtitulo}>
                Descubra onde assistir qualquer filme
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    titulo: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        color: 'white',
        marginBottom: 9
    },

    subtitulo: {
        fontSize: 20,
        color: 'grey',
        textAlign: "center",
        marginBottom: 15
    }
})
