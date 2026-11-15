require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())
app.use(express.json())

function simplificarFilme(filme) {
    let dataLancamento = filme.release_date

    if(dataLancamento === null) {
        dataLancamento = null
    } else {
        dataLancamento = dataLancamento.substr(0, 4)
    }

    let notaDoFilme = filme.vote_average.toFixed(1)

    let posterUrl = filme.poster_path

    if(posterUrl === null) {
        posterUrl = null
    } else {
        posterUrl = `https://image.tmdb.org/t/p/w342/${filme.poster_path}`
    }

    return {
        id: filme.id,
        titulo: filme.title,
        ano: dataLancamento,
        nota: notaDoFilme,
        poster: posterUrl
    }
}

//Usar ao invez do axios
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

const port = 3000
app.listen(port, () => {
    console.log(`Backend do OndePassa no ar. Porta: ${port}.`)
})