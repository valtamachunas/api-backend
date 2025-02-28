const express = require('express');
const app = express();
const porta = 3333;
const router = express.Router();

function mostraHora(request, response) {
    const data = new Date()
    const hora = data.toLocaleTimeString('pt-BR')
    response.send(hora)
};
function mostraPorta() {
    console.log("A porta é", porta)
}

app.use(router.get('/hora', mostraHora));
app.listen(porta, mostraPorta);

