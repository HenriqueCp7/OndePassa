import { FlatList, Text, StyleSheet, View } from 'react-native'
import { formatarNota } from '../utils/formatacao'
import CartaoFilme from './CartaoFilme'

export default function ListaFilmes({ titulo, filmes, onSelecionar }) {
    return (
        <View style={styles.view}>
            <Text style={styles.titulo}>
                {titulo}
            </Text>

            <FlatList
                style={styles.lista}
                data={filmes}
                renderItem={({ item }) =>
                    <CartaoFilme
                        id={item.id}
                        titulo={item.titulo}
                        ano={item.ano}
                        nota={formatarNota(item.nota)}
                        poster={item.poster}
                        onSelecionar={() => onSelecionar(item.id)}
                    />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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