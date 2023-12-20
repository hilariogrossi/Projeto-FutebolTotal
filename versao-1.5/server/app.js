const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
const { parseString } = require('xml2js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.json());
app.use(cors());

app.get('/jogadores/:id_time?', async (req, res) => {
    const idTime = req.params.id_time || null;
    const query = idTime
        ? 'SELECT jogadores.*, times.nome as nome_time, times.codigo as time_codigo FROM jogadores INNER JOIN times ON jogadores.id_time = times.id WHERE jogadores.id_time = ?'
        : 'SELECT jogadores.*, times.nome as nome_time, times.codigo as time_codigo FROM jogadores INNER JOIN times ON jogadores.id_time = times.id';

    try {
        const [rows, fields] = await pool.execute(query, [idTime]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.get('/rank_brasileirao/:id_time?', async (req, res) => {
    const idTime = req.params.id_time || null;
    let query = 'SELECT rank_brasileirao.*, times.nome as nome_time, times.codigo as time_codigo FROM rank_brasileirao INNER JOIN times ON rank_brasileirao.id_time = times.id';

    if (idTime) {
        query += ' WHERE rank_brasileirao.id_time = ?';
    }

    query += ' ORDER BY rank_brasileirao.posicao ASC';

    try {
        const [rows, fields] = await pool.execute(query, idTime ? [idTime] : []);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.get('/times/:id?', async (req, res) => {
    const idTime = req.params.id || null;
    const query = idTime
        ? 'SELECT * FROM times WHERE id = ?'
        : 'SELECT * FROM times';

    try {
        const [rows, fields] = await pool.execute(query, [idTime]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.get('/times_estatisticas/:id_time?', async (req, res) => {
    const idTime = req.params.id_time || null;
    let query = 'SELECT times_estatisticas.*, times.nome as nome_time, times.codigo as time_codigo FROM times_estatisticas INNER JOIN times ON times_estatisticas.id_time = times.id';

    if (idTime) {
        query += ' WHERE times_estatisticas.id_time = ?';
    }

    try {
        const [rows, fields] = await pool.execute(query, idTime ? [idTime] : []);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});


app.get('/jogos/:id_time?', async (req, res) => {
    const idTime = req.params.id_time || null;

    let query = `
        SELECT
            jogos.*,
            time_casa.nome as nome_time_casa,
            time_casa.codigo as codigo_time_casa,
            time_visitante.nome as nome_time_visitante,
            time_visitante.codigo as codigo_time_visitante
        FROM
            jogos
            INNER JOIN times as time_casa ON jogos.id_time_casa = time_casa.id
            INNER JOIN times as time_visitante ON jogos.id_time_visitante = time_visitante.id
    `;

    if (idTime) {
        query += ' WHERE jogos.id_time_casa = ? OR jogos.id_time_visitante = ?';
    }

    try {
        const [rows, fields] = await pool.execute(query, idTime ? [idTime, idTime] : []);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});


app.post('/usuario/novo', async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        res.status(500).send({ 'error': 'Nome, email, ou senha não preenchidos' });
        return;
    }

    const emailExistente = await verificaEmailExiste(email);
    if (emailExistente) {
        return res.status(400).send('E-mail já em uso');
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

    try {
        await pool.execute(query, [nome, email, hashedSenha]);
        const queryNewUser = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows, fields] = await pool.execute(queryNewUser, [email]);
        const usuario = rows[0];

        const token = jwt.sign({ usuarioId: usuario.id, email: usuario.email }, process.env.SECRET, { expiresIn: '72h' });
        const data = { 'token': token, 'nome': usuario.nome, 'email': usuario.email };
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ 'error': error });
    }
});

app.post('/usuario/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        res.status(500).send({ 'error': 'Email ou senha não preenchidos' });
        return;
    }

    const emailExistente = await verificaEmailExiste(email);
    if (!emailExistente) {
        return res.status(401).send({ 'error': 'Usuário não encontrado' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';

    try {
        const [rows, fields] = await pool.execute(query, [email]);

        const usuario = rows[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (senhaCorreta) {
            const token = jwt.sign({ usuarioId: usuario.id, email: usuario.email }, process.env.SECRET, { expiresIn: '72h' });
            const data = { 'token': token, 'nome': usuario.nome, 'email': usuario.email };
            res.status(200).json(data);
        } else {
            res.status(401).send({ 'error': 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.get('/usuario/validar-token', async (req, res) => {
    const { token } = req.query
    if (!token) {
        return res.status(401).send('Token ausente');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        res.status(200).send(decoded);
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        res.status(401).send('Token inválido');
    }
});

async function verificaEmailExiste(email) {
    const query = 'SELECT * FROM usuarios WHERE email = ?';

    try {
        const [rows, fields] = await pool.execute(query, [email]);
        return rows.length > 0;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.get('/noticias', async (req, res) => {
    const feedUrl = 'https://esportes.r7.com/futebol/feed.xml';

    try {
        const response = await axios.get(feedUrl);
        const xmlData = response.data;

        parseString(xmlData, (err, result) => {
            if (!err) {
                let allNews = [];
                for (newsItem in result.feed.entry) {
                    let news = result.feed.entry[newsItem];
                    const newsDate = new Date(news.published[0]);
                    const formattedDate = `${newsDate.getDate()}/${newsDate.getMonth() + 1}/${newsDate.getFullYear()}`;
                    const firstImageMatch = news.content[0].match(/<img[^>]*src=['"]([^'"]*)['"][^>]*>/);
                    const imageUrl = firstImageMatch ? firstImageMatch[1] : null;
                    
                    allNews.push({
                        title: news.title[0]._.replace(/<[^>]*>/g, ''),
                        date: formattedDate,
                        url: news.link[0].$.href,
                        imageUrl: imageUrl
                    })

                }
                res.json(allNews);

            } else {
                console.error('Erro ao converter XML para JSON:', err);
                res.status(500).send('Erro ao processar o feed');
            }
        });
    } catch (error) {
        console.error('Erro ao fazer a requisição para o feed:', error);
        res.status(500).send('Erro ao buscar o feed');
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
