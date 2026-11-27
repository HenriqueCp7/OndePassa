import { ScrollView, Text, View, StyleSheet, Image } from 'react-native'

export default function Provedores({ titulo, provedores }) {

    if (!provedores || provedores.length === 0) {
        return null
    } else {
        return (
            <View>
                <Text style={styles.titulo}>{titulo}</Text>
                <ScrollView horizontal style={styles.scroll}>
                    {provedores.map(provedor => (
                        <View key={provedor.nome} style={styles.item}>
                            <Image style={styles.logo} source={{ uri: provedor.logo }} />
                            <Text style={styles.nome} numberOfLines={2}>{provedor.nome}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        width: 72,
        alignItems: 'center',
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20
    },

    logo: {
        borderRadius: 5,
        height: 56,
        width: 56,
    },

    titulo: {
        color: "grey",
        fontSize: 16,
        marginBottom: 3
    },

    nome: {
        textAlign: "center",
        fontSize: 11,
        color: "white",
        marginBottom: 5,
        marginTop: 6,
    },

    scroll: {
        marginBottom: 10
    }
})
