const express = require('express');
const app = express();
const porta = 3333;
const router = express.Router();
const mulheres = [
    {
        nome: 'Valeska Tamachunas',
        imagem: 'https://avatars.githubusercontent.com/u/66183982?v=4',
        minibio: 'Desenvolvedora de software'
    },

    {
        nome: 'Jenifer Maciel',
        imagem: 'https://media.licdn.com/dms/image/v2/D4D03AQHwXqhNmJVPAw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722098292481?e=1746057600&v=beta&t=7U6ZfyY0KCucssedYi4pFoAP0UMTP5qTWmuJzwxBUvA',
        minibio: 'UX Designer'
    },

    {
        nome: 'Loiane Groner',
        imagem: 'https://avatars.githubusercontent.com/u/59545?v=4',
        minibio: 'Engenheira de software'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres);
}
function mostraPorta() {
    console.log("A porta é", porta)
}

app.use(router.get('/mulheres', mostraMulheres));
app.listen(porta, mostraPorta);

