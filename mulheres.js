//meu servidor


const express = require('express'); //aqui estou iniciando o express
const router = express.Router(); //aqui estou configurando a primeira parte da rota
const cors = require('cors'); //aqui estou trazendo o pacote cors que permite consumir a API no frontend

const conectaBancoDeDados = require('./bancoDeDados'); //aqui estou ligando ao arquivo bancoDeDados
conectaBancoDeDados(); //aqui estou chamando a função que conecta o banco de dados

const app = express(); //aqui estou iniciando o app

const Mulher = require('./mulherModel');

app.use(express.json()); //aqui estou configurando o app para usar json, isso é um middleware ou seja, é executado antes de chamar a rota


app.use(cors()); //aqui estou liberando meu aplicativo para ser usada a partir do frontend

const porta = 3333; //aqui estou criando a porta

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();
        response.json(mulheresVindasDoBancoDeDados);
    }
    catch (erro) {
        console.log(erro)
    }
}

//POST
async function criaMulher(request, response) { //pega as informações quando algum usuário preencher o formulário, pega no corpo da solicitação
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save() //to me conectando com o serviço externo ou seja o banco de dados, por isso tenho que esperar(await)
        response.status(201).json(mulherCriada)
    }
    catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id); //params pega da url

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome;
        }
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem;
        }
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio;
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)
    }
    catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: "Mulher deletada com sucesso!" })
    }
    catch (erro) {
        console.log(erro)
    }

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

