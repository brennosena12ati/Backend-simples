const express = require('express');

const app = express();
const port = 3333;

app.get('/', (req, res) => {
    res.json({
        message: 'Olá backend! Esta é uma API simples que responde conforme solicitado.',
        status: 'sucesso',
    });
});

app.listen(port, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}`);
});