import { Text, View, StyleSheet, Image } from "react-native"

export default function CartaoFilme({titulo, ano, nota, poster}) {
        
        let imagem

        if(poster === null) {
            imagem = (
                <View style={styles.semPoster}>
                    <Text>Sem poster</Text>
                </View>
            )
        } else {
            imagem = (
                <Image style={styles.poster} source={{ uri: poster }}/>
            )
        }

        return(
            <View style={styles.cartao}>
                {imagem}

                <View style={styles.informacoes}>
                    <Text style={styles.titulo} numberOfLines={2}>{titulo}</Text>
                
                    {ano !== null && <Text style={styles.ano}>{ano}</Text>}

                    <Text style={styles.nota}>{nota}</Text>
                </View>
            </View>
        )
}

const styles = StyleSheet.create ({
    cartao: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: 10
    },

    semPoster: {
        height: 105,
        width: 70,
        color: 'grey',
        borderRadius: 10
    },

    poster: {
        height: 105,
        width: 70,
        borderRadius: 10,
    },

    informacoes: {
        marginLeft: 10,
        flex: 1,
    },

    titulo: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: "white"
    },

    nota: {
        color: "yellow"
    },

    ano: {
        color: "white"
    }
})