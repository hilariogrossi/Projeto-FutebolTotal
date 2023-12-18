import mysql from 'mysql2/promise';
import axios from 'axios';

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
        const teams = await getAllTeams(connection);
        await teams.forEach(async (team) => {
            const idApi = parseInt(team.id_api);

            const teamCoachs = await getTeamCoach(idApi);
            await teamCoachs.forEach(async (coach) => {
                const nome = coach.name;
                const id_api = coach.id;
                const idade = coach.age;
                const numero_camisa = null;
                const posicao = 'Treinador';
                const id_time = team.id;
                if( typeof coach.career[0].end != 'string' ) {
                    await insertPlayer(connection, id_api, id_time, nome, idade, numero_camisa, posicao);
                }
    
            });

        });
        //process.exit();


    } catch (error) {
        console.error('Erro na consulta: ' + error.message);
    }
}

await main();


async function getAllTeams(connection) {
    const [rows] = await connection.execute('SELECT * FROM times');
    return rows || null;
}

async function getTeamCoach(teamId) {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/coachs',
        params: {
            team: teamId
        },
        headers: {
            'X-RapidAPI-Key': '25eb0c4494msh9d29717fb6b691cp1e97b7jsn9b8a99043e70',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data.response;
    } catch (error) {
        throw error;
    }
}

async function findPlayerByApiId(connection, idApi) {
    const [rows] = await connection.execute('SELECT * FROM jogadores WHERE id_api = ?', [idApi]);
    return rows[0] || null;
}

async function insertPlayer(connection, id_api, id_time, nome, idade, numero_camisa, posicao) {
    const sql = 'INSERT INTO jogadores (id_api, id_time, nome, idade, numero_camisa, posicao) VALUES (?, ?, ?, ?, ?, ?)';
    await connection.execute(sql, [id_api, id_time, nome, idade, numero_camisa, posicao]);
}

async function updatePlayer(connection, id_api, id_time, nome, idade, numero_camisa, posicao) {
    const sql = 'UPDATE jogadores SET id_time = ?, nome = ?, idade = ?, numero_camisa = ?, posicao = ? WHERE id_api = ?';
    await connection.execute(sql, [id_time, nome, idade, numero_camisa, posicao, id_api]);
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