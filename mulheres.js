const express = require('express'); //aqui estou iniciando o express
const router = express.Router(); //aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid'); //essa biblioteca instanciada através do comando npm no terminal, serve para gerar um id único
const conectaBancoDeDados = require('./bancoDeDados'); //aqui estou ligando ao arquivo bancoDeDados
conectaBancoDeDados(); //aqui estou chamando a função que conecta o banco de dados

const app = express(); //aqui estou iniciando o app
app.use(express.json()); //aqui estou configurando o app para usar json, isso é um middleware ou seja, é executado antes de chamar a rota
const porta = 3333; //aqui estou criando a porta

//aqui estou criando lista incial de mulheres
const mulheres = [
    {
        id: '1',
        nome: 'Valeska Tamachunas',
        imagem: 'https://avatars.githubusercontent.com/u/66183982?v=4',
        minibio: 'Desenvolvedora de software'
    },

    {
        id: '2',
        nome: 'Jenifer Maciel',
        imagem: 'https://media.licdn.com/dms/image/v2/D4D03AQHwXqhNmJVPAw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722098292481?e=1746057600&v=beta&t=7U6ZfyY0KCucssedYi4pFoAP0UMTP5qTWmuJzwxBUvA',
        minibio: 'UX Designer'
    },

    {
        id: '3',
        nome: 'Loiane Groner',
        imagem: 'https://avatars.githubusercontent.com/u/59545?v=4',
        minibio: 'Engenheira de software'
    }
]

//GET
function mostraMulheres(request, response) {
    response.json(mulheres);
}

//POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }
    mulheres.push(novaMulher);
    response.json(mulheres);
}

//PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher;
        }
    }
    const mulherEncontrada = mulheres.find(encontraMulher);
    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome;
    }
    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem;
    }
    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio;
    }
    response.json(mulheres);
}

//DELETE
function deletaMulher(request, response) {
    function todasMenosEla(mulher) {
        if (mulher.id !== request.params.id) {
            return mulher
        }
    }
    const mulheresQueFicaram = mulheres.filter(todasMenosEla)
    response.json(mulheresQueFicaram)
}

//PORTA
function mostraPorta() {
    console.log("A porta é", porta)
}


app.use(router.get('/mulheres', mostraMulheres)); //configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)); //configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)); //configurei rota PATCH /mulheres:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei rota DELETE /mulheres:id
app.listen(porta, mostraPorta); //servidor ouvindo na porta 3333

