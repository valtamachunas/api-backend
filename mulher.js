const express = require('express');
const app = express();
const router = express.Router();
const porta = 3333;

function mostraMulher(request, response) {
    response.json({
        nome: 'Valeska Tamachunas',
        imagem: 'https://avatars.githubusercontent.com/u/66183982?v=4',
        minibio: 'Desenvolvedora de software'
    });
}
function mostraPorta() {
    console.log("A porta é", porta)
}

app.use(router.get('/mulher', mostraMulher));
app.listen(porta, mostraPorta);

