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
        const teams = await getTabela();
        for (const team of teams) {
            const name = team.team.name;
            const idApi = parseInt(team.team.id);
            const pontos = parseInt(team.points);
            const jogos = parseInt(team.all.played);
            const rank = parseInt(team.rank);
            const vitorias = parseInt(team.all.win);
            const empates = parseInt(team.all.draw);
            const derrotas = parseInt(team.all.lose);
            const gols_marcados = parseInt(team.all.goals.for);
            const gols_sofridos = parseInt(team.all.goals.against);
            const saldo_de_gols = gols_marcados - gols_sofridos;
            const status = team.status;
            const updateDate = new Date(team.update);
            const update = updateDate.toISOString().slice(0, 19).replace('T', ' ');
            const teamDb = await findTeamByApiId(connection, idApi);

            const existingRanking = await findTeamTableByApiId(connection, idApi);
            if (existingRanking) {
                await updateTeam(connection, existingRanking.id, pontos, jogos, rank, vitorias, empates, derrotas, gols_marcados, gols_sofridos, saldo_de_gols, status, update);
            } else {
                await insertTeam(connection, pontos, jogos, rank, vitorias, empates, derrotas, gols_marcados, gols_sofridos, saldo_de_gols, status, update, teamDb.id);
            }
        }

        process.exit();
    
    } catch (error) {
        console.error('Erro na consulta: ' + error.message);

        process.exit(1);

    }
}

await main();


async function getTabela() {
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


async function findTeamTableByApiId(connection, idApi) {
    const [rows] = await connection.execute("SELECT * FROM rank_brasileirao LEFT JOIN times ON times.id = rank_brasileirao.id_time WHERE times.id_api = ?", [idApi]);
    return rows[0] || null;
}

async function insertTeam(connection, pontos, jogos, posicao, vitorias, empates, derrotas, gols_marcados, gols_sofridos, saldo_de_gols, status, update, id_time) {
    const sql = 'INSERT INTO rank_brasileirao (pontos, jogos, posicao, vitorias, empates, derrotas, gols_marcados, gols_sofridos, saldo_de_gols, status, updated, id_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    const query = await connection.format(sql, [pontos, jogos, posicao, vitorias, empates, derrotas, gols_marcados, gols_sofridos, saldo_de_gols, status, update, id_time]);

    console.log('Query SQL:', query);

    await connection.query(query);
}

async function updateTeam(connection, id, pontos, jogos, posicao, vitorias, empates, derrotas, gols_marcados, gols_sofridos, saldo_de_gols, status, update) {
    const sql = 'UPDATE rank_brasileirao SET nome = ?, pontos = ?, jogos = ?, posicao = ?, vitorias = ?, empates = ?, derrotas = ?, gols_marcados = ?, gols_sofridos = ?, saldo_de_gols = ?, status = ?, updated = ? WHERE id = ?';
    await connection.execute(sql, [pontos, jogos, posicao, vitorias, empates, derrotas, gols_marcados, gols_sofridos, saldo_de_gols, status, updated, id]);
}

async function findTeamByApiId(connection, idApi) {
    const [rows] = await connection.execute('SELECT * FROM times WHERE id_api = ?', [idApi]);
    return rows[0] || null;
}
