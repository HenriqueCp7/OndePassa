require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())
app.use(express.json())

function simplificarFilme(filme) {
    let dataLancamento = filme.release_date

    if(!dataLancamento) {
        dataLancamento = null
    } else {
        dataLancamento = dataLancamento.substr(0, 4)
    }

    let notaDoFilme = filme.vote_average.toFixed(1)

    let posterUrl = filme.poster_path

    if(!posterUrl) {
        posterUrl = null
    } else {
        posterUrl = `https://image.tmdb.org/t/p/w342${filme.poster_path}`
    }

    return {
        id: filme.id,
        titulo: filme.title,
        ano: dataLancamento,
        nota: notaDoFilme,
        poster: posterUrl
    }
}

function simplificarProvedores(lista) {
    if (!lista) {
        return []
    } 
        
    return lista.map(provedor => {
        const logoUrl = `https://image.tmdb.org/t/p/w92${provedor.logo_path}`

        return {
            "nome": provedor.provider_name, 
            "logo": logoUrl
        }
    })
}

const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.TMDB_TOKEN,
        language: 'pt-BR',
    }
})

app.get('/', async (req, res) => {
    res.json({
        app: "OndePassa",
        status: "online"
    })
})

app.get('/em-alta', async (req, res) => {
    try {
        const resposta = await tmdbClient.get(`/trending/movie/week`)

        const filmes = resposta.data.results.map(simplificarFilme)
    
        res.json({result: filmes})
    } catch (erro) {

        res.status(502).json({
            "mensagem": 'Não foi possível consultar o catálogo de filmes.'
        });
    }
})

app.get('/filmes', async (req, res) => {
    const termo = req.query.busca
    console.log(termo)

    if(!termo || termo.trim().length === 0) {
        return res.status(400).json ({
            "mensagem": "Informe o título de um filme." 
        })
    } 
        
    console.log(`Busca ${termo}`)

    let busca = termo.trim()
    
    try {
        const resposta = await tmdbClient.get(`/search/movie`, {
            params: {
                query: busca,
                include_adult: false
            }
        })

        const filmes = resposta.data.results.map(simplificarFilme)
    
        res.json({result: filmes})
    } catch {

        res.status(502).json({
            "mensagem": 'Erro ao consultar filmes'
        });
    }
}) 

app.get('/filme', async (req, res) => {
    const id = req.query.id

    if(!id) {
        return res.status(400).json({
            "mensagem": "Informe o id do filme."
        })
    } else {
        try {
            const resposta =  await tmdbClient.get(`/movie/${id}?append_to_response=watch/providers`)

            let filme = simplificarFilme(resposta.data)

            let duracao = resposta.data.runtime
            if(duracao === 0 || !duracao) {
                duracao = null
            } 

            let generos = `[${resposta.data.genres.map(genero => {
                return genero.name
            }).join(", ")}]`

            let sinopse = resposta.data.overview
            if(!sinopse) sinopse = null
            
            let imagemDeFundoUrl = resposta.data.backdrop_path
            if (imagemDeFundoUrl !== null) {
                imagemDeFundoUrl = `https://image.tmdb.org/t/p/w780${imagemDeFundoUrl}`
            } 

            let assistirPath = {}
            let provider = resposta.data["watch/providers"]

            if(provider && provider.results && provider.results.BR) {
                assistirPath = provider.results.BR
            }

            let assinaturaSimplificada = simplificarProvedores(assistirPath.flatrate)
            let aluguelSimplificada = simplificarProvedores(assistirPath.rent)
            let compraSimplificada = simplificarProvedores(assistirPath.buy)

            let ondeAssistir = {
                assinatura: assinaturaSimplificada,
                aluguel: aluguelSimplificada,
                compra: compraSimplificada
            }

            res.json({
                id: filme.id,
                titulo: filme.titulo,
                ano: filme.ano,
                nota: filme.nota,
                duracao: duracao,
                generos: generos,
                sinopse: sinopse,
                fundo: imagemDeFundoUrl,
                ondeAssistir: ondeAssistir
            })
        } catch(e){
            if(e.response && e.response.status === 404) {
                res.status(404).json({
                    "mensagem": "Filme não encontrado"
                })
            } else {
                res.status(502).json({
                    "mensagem": 'Erro ao consultar filmes'
                });
            }
        }
    }
})

const port = 3000
app.listen(port, () => {
    console.log(`Backend do OndePassa no ar. Porta: ${port}.`)
})