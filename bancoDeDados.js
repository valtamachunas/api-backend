const mongoose = require('mongoose'); //aqui estou importando o mongoose
require('dotenv').config(); //aqui estou importando o dotenv

async function conectaBancoDeDados() { //async vai permitir que demore para conectar e mesmo assim o código continue rodando, ai usa o await para esperar a conexão, usa o try para tentar conectar e o catch para pegar o erro caso não consiga
    try {
        console.log('Conexão com o banco de dados iniciou')

        await mongoose.connect(process.env.MONGO_URL)

        console.log('Conexão com o banco de dados feita com sucesso!')

    } catch (erro) {
        console.log(erro)
    }
}

module.exports = conectaBancoDeDados //aqui estou exportando o conectaBancoDeDados para ser utilizado em outros arquivos