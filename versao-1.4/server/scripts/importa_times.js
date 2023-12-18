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
        const teams = await getAllTeams();
        //console.log( teams );
        await teams.forEach(async (team) => {
            const name = team.team.name;
            const idApi = parseInt(team.team.id);

            const teamInfo = await getTeam(idApi);
            console.log(teamInfo);
            const code = teamInfo.team.code;
            const foundation = String(teamInfo.team.founded);
            const stadium = teamInfo.venue.name;
            const stadiumAddress = teamInfo.venue.address;
            const stadiumCity = teamInfo.venue.city;

            const existingTeam = await findTeamByApiId(connection, idApi);
            if (existingTeam) {
                await updateTeam(connection, existingTeam.id, name, code, foundation, stadium, stadiumAddress, stadiumCity);
            } else {
                await insertTeam(connection, idApi, name, code, foundation, stadium, stadiumAddress, stadiumCity);
            }
        });
        //process.exit();


    } catch (error) {
        console.error('Erro na consulta: ' + error.message);
    }
}

await main();


async function getAllTeams() {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
        params: {
            league: 71,
            season: 2023,
        },
        headers: {
            'X-RapidAPI-Key': '25eb0c4494msh9d29717fb6b691cp1e97b7jsn9b8a99043e70',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.response[0].league.standings[0];
    } catch (error) {
        throw error;
    }
}


async function getTeam(teamId) {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams/',
        params: {
            id: teamId
        },
        headers: {
            'X-RapidAPI-Key': '25eb0c4494msh9d29717fb6b691cp1e97b7jsn9b8a99043e70',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.response[0];
    } catch (error) {
        throw error;
    }
}

async function findTeamByApiId(connection, idApi) {
    const [rows] = await connection.execute('SELECT * FROM times WHERE id_api = ?', [idApi]);
    return rows[0] || null;
}

async function insertTeam(connection, idApi, name, code, foundation, stadium, stadiumAddress, stadiumCity) {
    console.log('foundation ------- ', foundation)
    const sql = 'INSERT INTO times (id_api, nome, codigo, ano_fundacao, nome_estadio, endereco_estadio, cidade_estadio) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await connection.execute(sql, [idApi, name, code, foundation, stadium, stadiumAddress, stadiumCity]);
}

async function updateTeam(connection, id, name, code, foundation, stadium, stadiumAddress, stadiumCity) {
    const sql = 'UPDATE times SET nome = ?, codigo = ?, ano_fundacao = ?, nome_estadio = ?, endereco_estadio = ?, cidade_estadio = ? WHERE id = ?';
    await connection.execute(sql, [name, code, foundation, stadium, stadiumAddress, stadiumCity, id]);
}