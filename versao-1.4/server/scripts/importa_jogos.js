import mysql from 'mysql2/promise';
import axios from 'axios';
import moment from 'moment-timezone';
import 'dotenv/config'

async function main() {
    const connection = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    try {   
        const rounds = await getFixtures();
        for (const round of rounds) {
            
            const time_casa = await findTeamByApiId(connection, round.teams.home.id);
            const time_visitante = await findTeamByApiId(connection, round.teams.away.id);

            const id_api = round.fixture.id;
            const id_time_casa = time_casa.id;
            const id_time_visitante = time_visitante.id;
            const arbitro = round.fixture.referee;
            const data_jogo = moment(round.fixture.date).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            const estadio_nome = round.fixture.venue.name;
            const status = round.fixture.status.short;
            const rodada = parseInt(round.league.round.replace(/\D/g, ''), 10);
            const gols_casa = round.goals.home;
            const gols_visitante = round.goals.away;
            const penalti_visitante = round.score.penalty.home;
            const penalti_casa = round.score.penalty.away;

            let vencedor = null;
            if (round.teams.home.winner === true){
                vencedor = id_time_casa;

            } else {
                if (round.teams.away.winner === true){
                    vencedor = id_time_visitante;
                }
            }

            const existingJogo = await findFixtureByApiId(connection, id_api);
            if( existingJogo ) {
                await updateJogo(connection, id_api, id_time_casa, id_time_visitante, arbitro, data_jogo, estadio_nome, status, rodada, gols_casa, gols_visitante, penalti_visitante, penalti_casa, vencedor );
                console.log( 'jogo existe' )
            } else {
                console.log( 'jogo nao existe');
                await insertJogo(connection, id_api, id_time_casa, id_time_visitante, arbitro, data_jogo, estadio_nome, status, rodada, gols_casa, gols_visitante, penalti_visitante, penalti_casa, vencedor );
            }


        }
        
        process.exit();


    } catch (error) {
        console.error('Erro na consulta: ' + error.message);
        process.exit(1);
    }
}

await main();


async function getAllTeams(connection) {
    const [rows] = await connection.execute('SELECT * FROM times');
    return rows || null;
}

async function getFixtures() {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
            league: 71,
            season:'2023'
        },
        headers: {
            'X-RapidAPI-Key': '25eb0c4494msh9d29717fb6b691cp1e97b7jsn9b8a99043e70',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.response;
    } catch (error) {
        throw error;
    }
}

async function findPlayerByApiId(connection, idApi) {
    const [rows] = await connection.execute('SELECT * FROM jogadores WHERE id_api = ?', [idApi]);
    return rows[0] || null;
}

async function insertJogo(connection, id_api, id_time_casa, id_time_visitante, arbitro, data_jogo, estadio_nome, status, rodada, gols_casa, gols_visitante, penalti_visitante, penalti_casa, vencedor ) {
    const sql = 'INSERT INTO jogos (id_api, id_time_casa, id_time_visitante, arbitro, data_jogo, estadio_nome, status, rodada, gols_casa, gols_visitante, penalti_visitante, penalti_casa, vencedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await connection.execute(sql, [id_api, id_time_casa, id_time_visitante, arbitro, data_jogo, estadio_nome, status, rodada, gols_casa, gols_visitante, penalti_visitante, penalti_casa, vencedor]);
}

async function updateJogo(connection, id_api, id_time_casa, id_time_visitante, arbitro, data_jogo, estadio_nome, status, rodada, gols_casa, gols_visitante, penalti_visitante, penalti_casa, vencedor ) {
    const sql = 'UPDATE jogos SET id_time_casa = ?, id_time_visitante = ?, arbitro = ?, data_jogo = ?, estadio_nome = ?, status = ?, rodada = ?, gols_casa = ?, gols_visitante = ?, penalti_casa = ?, penalti_visitante = ?, vencedor = ? WHERE id_api = ?';
    const params = [id_time_casa, id_time_visitante, arbitro, data_jogo, estadio_nome, status, rodada, gols_casa, gols_visitante, penalti_casa, penalti_visitante, vencedor, id_api];
    const query = await connection.format(sql, params);
    console.log('Query SQL:', query);

    await connection.query(query);
}

async function findFixtureByApiId(connection, idApi) {
    const [rows] = await connection.execute('SELECT * FROM jogos WHERE id_api = ?', [idApi]);
    return rows[0] || null;
}

async function findTeamByApiId(connection, idApi) {
    const [rows] = await connection.execute('SELECT * FROM times WHERE id_api = ?', [idApi]);
    return rows[0] || null;
}

function translatePosition(englishPosition) {
    let position = {
        'Goalkeeper': 'Goleiro',
        'Defender': 'Zagueiro',
        'Midfielder': 'Meio-de-Campo',
        'Attacker': 'Atacante'
    }

    if (position[englishPosition] && typeof position[englishPosition] == 'string') {
        return position[englishPosition];
    }

    return englishPosition;
}