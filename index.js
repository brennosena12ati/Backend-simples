const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3333;

// Configuração do Banco de Dados
const dbConfig = {
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03mc',
    port: 3306
};

// Middleware
app.use(cors());
app.use(express.json());

// Pool de conexão para melhor performance e gerenciamento
const pool = mysql.createPool(dbConfig);

// Rotas

// 1. Listar todos os produtos
app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produtos_brenno');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

// 2. Cadastrar novo produto
app.post('/produtos', async (req, res) => {
    const { nome, categoria, preco } = req.body;

    if (!nome || !categoria || preco === undefined || preco === null || isNaN(preco)) {
        return res.status(400).json({ error: 'Nome, categoria e preço válido são obrigatórios' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO produtos_brenno (nome, categoria, preco) VALUES (?, ?, ?)',
            [nome, categoria, preco]
        );
        res.status(201).json({ id: result.insertId, nome, categoria, preco });
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
});

// 3. Apagar um produto
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM produtos_brenno WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        console.error('Erro ao apagar produto:', error);
        res.status(500).json({ error: 'Erro ao apagar produto' });
    }
});

// Rota raiz opcional
app.get('/', (req, res) => {
    res.json({
        message: 'API de Produtos rodando!',
        status: 'sucesso',
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});