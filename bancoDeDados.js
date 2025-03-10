const mongoose = require('mongoose'); //aqui estou importando o mongoose

async function conectaBancoDeDados() { //async vai permitir que demore para conectar e mesmo assim o código continue rodando, ai usa o await para esperar a conexão, usa o try para tentar conectar e o catch para pegar o erro caso não consiga
    try {
        console.log('Conexão com o banco de dados iniciou')

        await mongoose.connect('mongodb+srv://vahtamachunas:axdoKwOGGU2loiVC@cluster0.wto3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

        console.log('Conexão com o banco de dados feita com sucesso!')

    } catch (erro) {
        console.log(erro)
    }
}

module.exports = conectaBancoDeDados //aqui estou exportando o conectaBancoDeDados para ser utilizado em outros arquivos