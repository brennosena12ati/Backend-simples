const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03mc',
    port: 3306
};

async function testConnection() {
    try {
        console.log('Tentando conectar ao banco de dados...');
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conexão estabelecida com sucesso!');

        const [rows] = await connection.query('SHOW TABLES LIKE "produtos_brenno"');
        if (rows.length > 0) {
            console.log('Tabela "produtos_brenno" encontrada.');
        } else {
            console.log('Tabela "produtos_brenno" NÃO encontrada.');
        }

        await connection.end();
    } catch (error) {
        console.error('Erro de conexão:', error.message);
        process.exit(1);
    }
}

testConnection();
