-- Active: 1771869108553@@benserverplex.ddns.net@3306@web_03mc
-- SQL para criar a tabela de produtos
-- Nome da tabela: produtos_brenno
-- Banco de dados: web_03mc

CREATE TABLE IF NOT EXISTS produtos_brenno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);