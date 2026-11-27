import { View, Text, StyleSheet } from 'react-native'

export default function Creditos() {
    return (
        <View>
            <Text style={styles.creditos}>
                Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    creditos: {
        fontSize: 12,
        textAlign: 'center',
        color: 'grey',
        marginTop: 29,
        backgroundColor: '#16162b'
    }
})