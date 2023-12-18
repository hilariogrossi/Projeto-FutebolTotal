import mysql from 'mysql2/promise';
import axios from 'axios';
import 'dotenv/config';

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
        //console.log( teams );
        for (const team of teams) {
            const teamStats = await getEstatisticas(team.id_api);

            // variaveis
            const gols_totais = teamStats.goals.for.total.total;
            const gols_casa = teamStats.goals.for.total.home;
            const gols_fora = teamStats.goals.for.total.away;
            const gols_sofridos = teamStats.goals.against.total.total;

            const cartoes_amarelos = teamStats.cards.yellow['0-15'].total + teamStats.cards.yellow['16-30'].total + teamStats.cards.yellow['31-45'].total + teamStats.cards.yellow['46-60'].total + teamStats.cards.yellow['61-75'].total + teamStats.cards.yellow['76-90'].total + teamStats.cards.yellow['91-105'].total + teamStats.cards.yellow['106-120'].total;
            console.log(cartoes_amarelos)

            const cartoes_vermelhos = teamStats.cards.red['0-15'].total + teamStats.cards.red['16-30'].total + teamStats.cards.red['31-45'].total + teamStats.cards.red['46-60'].total + teamStats.cards.red['61-75'].total + teamStats.cards.red['76-90'].total + teamStats.cards.red['91-105'].total + teamStats.cards.red['106-120'].total;
            console.log(cartoes_vermelhos)

            const penaltis_totais = teamStats.penalty.total;
            console.log(penaltis_totais)

            const penaltis_convertidos = teamStats.penalty.scored.total;
            console.log(penaltis_convertidos)

            const penaltis_perdidos = teamStats.penalty.missed.total;
            console.log(penaltis_perdidos)

            const nao_sofreu_gol_casa = teamStats.clean_sheet.home;
            console.log(nao_sofreu_gol_casa)

            const nao_sofreu_gol_fora = teamStats.clean_sheet.away;
            console.log(nao_sofreu_gol_fora)

            const nao_marcou_gol_casa = teamStats.failed_to_score.home;
            console.log(nao_marcou_gol_casa)

            const nao_marcou_gol_fora = teamStats.failed_to_score.away;
            console.log(nao_marcou_gol_fora)

            const jogos_casa = teamStats.fixtures.played.home;
            console.log(jogos_casa)

            const jogos_fora = teamStats.fixtures.played.away;
            console.log(jogos_fora)

            const jogos_totais = teamStats.fixtures.played.total;
            console.log(jogos_totais)

            const vitorias_casa = teamStats.fixtures.wins.home;
            console.log(vitorias_casa)

            const vitorias_fora = teamStats.fixtures.wins.away;
            console.log(vitorias_fora)

            const vitorias_totais = teamStats.fixtures.wins.total;
            console.log(vitorias_totais)

            const empates_casa = teamStats.fixtures.draws.home;
            console.log(empates_casa)

            const empates_fora = teamStats.fixtures.draws.away;
            console.log(empates_fora)

            const empates_totais = teamStats.fixtures.draws.total;
            console.log(empates_totais)

            const derrotas_casa = teamStats.fixtures.loses.home;
            console.log(derrotas_casa)

            const derrotas_fora = teamStats.fixtures.loses.away;
            console.log(derrotas_fora)

            const derrotas_totais = teamStats.fixtures.loses.total;
            console.log(derrotas_totais)

            const id_time = team.id;
            console.log(id_time)

            if( await findTeamByTeamId(connection, id_time ) != false ) {
                console.log(findTeamByTeamId(connection, id_time ));
                await updateTeamStats(
                    connection,
                    id_time,
                    gols_totais,
                    gols_casa,
                    gols_fora,
                    gols_sofridos,
                    cartoes_amarelos,
                    cartoes_vermelhos,
                    penaltis_totais,
                    penaltis_convertidos,
                    penaltis_perdidos,
                    nao_sofreu_gol_casa,
                    nao_sofreu_gol_fora,
                    nao_marcou_gol_casa,
                    nao_marcou_gol_fora,
                    jogos_casa,
                    jogos_fora,
                    jogos_totais,
                    vitorias_casa,
                    vitorias_fora,
                    vitorias_totais,
                    empates_casa,
                    empates_fora,
                    empates_totais,
                    derrotas_casa,
                    derrotas_fora,
                    derrotas_totais
                );
            } else {
                await insertTeam(    
                    connection, 
                    gols_totais,
                    gols_casa,
                    gols_fora,
                    gols_sofridos,
                    cartoes_amarelos,
                    cartoes_vermelhos,
                    penaltis_totais,
                    penaltis_convertidos,
                    penaltis_perdidos,
                    nao_sofreu_gol_casa,
                    nao_sofreu_gol_fora,
                    nao_marcou_gol_casa,
                    nao_marcou_gol_fora,
                    jogos_casa,
                    jogos_fora,
                    jogos_totais,
                    vitorias_casa,
                    vitorias_fora,
                    vitorias_totais,
                    empates_casa,
                    empates_fora,
                    empates_totais,
                    derrotas_casa,
                    derrotas_fora,
                    derrotas_totais, 
                    id_time);
                
            }

        };

        process.exit();
    } catch (error) {
        console.error('Erro na consulta: ' + error.message);
        process.exit(1);
    }
}

await main();


async function getEstatisticas(teamApiId) {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
        params: {
            league: 71,
            season: 2023,
            team: teamApiId,
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


async function findTeamTableByApiId(connection, idApi) {
    const [rows] = await connection.execute("SELECT * FROM rank_brasileirao LEFT JOIN times ON times.id = rank_brasileirao.id_time WHERE times.id_api = ?", [idApi]);
    return rows[0] || null;
}

async function insertTeam(
    connection, 
    id_api,
    gols_totais,
    gols_casa,
    gols_fora,
    gols_sofridos,
    cartoes_amarelos,
    cartoes_vermelhos,
    penaltis_totais,
    penaltis_convertidos,
    penaltis_perdidos,
    nao_sofreu_gol_casa,
    nao_sofreu_gol_fora,
    nao_marcou_gol_casa,
    nao_marcou_gol_fora,
    jogos_casa,
    jogos_fora,
    jogos_totais,
    vitorias_casa,
    vitorias_fora,
    vitorias_totais,
    empates_casa,
    empates_fora,
    empates_totais,
    derrotas_casa,
    derrotas_fora,
    derrotas_totais, 
    id_time) {


    const sql = 'INSERT INTO times_estatisticas (gols_totais, gols_casa, gols_fora, gols_sofridos, cartoes_amarelos, cartoes_vermelhos, penaltis_totais, penaltis_convertidos, penaltis_perdidos, nao_sofreu_gol_casa, nao_sofreu_gol_fora, nao_marcou_gol_casa, nao_marcou_gol_fora, jogos_casa, jogos_fora, jogos_totais, vitorias_casa, vitorias_fora, vitorias_totais, empates_casa, empates_fora, empates_totais, derrotas_casa, derrotas_fora, derrotas_totais, id_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const query = await connection.format(sql, [id_api, gols_totais, gols_casa, gols_fora, gols_sofridos, cartoes_amarelos, cartoes_vermelhos, penaltis_totais, penaltis_convertidos, penaltis_perdidos, nao_sofreu_gol_casa, nao_sofreu_gol_fora, nao_marcou_gol_casa, nao_marcou_gol_fora, jogos_casa, jogos_fora, jogos_totais, vitorias_casa, vitorias_fora, vitorias_totais, empates_casa, empates_fora, empates_totais, derrotas_casa, derrotas_fora, derrotas_totais, id_time]);

    console.log('Query SQL:', query);

    await connection.query(query);
}

async function findTeamByTeamId(connection, id_time) {
    const [rows] = await connection.execute('SELECT * FROM times_estatisticas WHERE id_time = ?', [id_time]);
    return rows[0] || false;
}

async function getAllTeams(connection) {
    const [rows] = await connection.execute('SELECT * FROM times');
    return rows || null;
}
async function updateTeamStats(
    connection,
    id_time,
    gols_totais,
    gols_casa,
    gols_fora,
    gols_sofridos,
    cartoes_amarelos,
    cartoes_vermelhos,
    penaltis_totais,
    penaltis_convertidos,
    penaltis_perdidos,
    nao_sofreu_gol_casa,
    nao_sofreu_gol_fora,
    nao_marcou_gol_casa,
    nao_marcou_gol_fora,
    jogos_casa,
    jogos_fora,
    jogos_totais,
    vitorias_casa,
    vitorias_fora,
    vitorias_totais,
    empates_casa,
    empates_fora,
    empates_totais,
    derrotas_casa,
    derrotas_fora,
    derrotas_totais
) {
    const sql = `
        UPDATE times_estatisticas
        SET
            gols_totais = ?,
            gols_casa = ?,
            gols_fora = ?,
            gols_sofridos = ?,
            cartoes_amarelos = ?,
            cartoes_vermelhos = ?,
            penaltis_totais = ?,
            penaltis_convertidos = ?,
            penaltis_perdidos = ?,
            nao_sofreu_gol_casa = ?,
            nao_sofreu_gol_fora = ?,
            nao_marcou_gol_casa = ?,
            nao_marcou_gol_fora = ?,
            jogos_casa = ?,
            jogos_fora = ?,
            jogos_totais = ?,
            vitorias_casa = ?,
            vitorias_fora = ?,
            vitorias_totais = ?,
            empates_casa = ?,
            empates_fora = ?,
            empates_totais = ?,
            derrotas_casa = ?,
            derrotas_fora = ?,
            derrotas_totais = ?
        WHERE id_time = ?`;

    const params = [
        gols_totais,
        gols_casa,
        gols_fora,
        gols_sofridos,
        cartoes_amarelos,
        cartoes_vermelhos,
        penaltis_totais,
        penaltis_convertidos,
        penaltis_perdidos,
        nao_sofreu_gol_casa,
        nao_sofreu_gol_fora,
        nao_marcou_gol_casa,
        nao_marcou_gol_fora,
        jogos_casa,
        jogos_fora,
        jogos_totais,
        vitorias_casa,
        vitorias_fora,
        vitorias_totais,
        empates_casa,
        empates_fora,
        empates_totais,
        derrotas_casa,
        derrotas_fora,
        derrotas_totais,
        id_time
    ];

    const query = await connection.format(sql, params);
    console.log('Query SQL:', query);

    await connection.query(query);
}