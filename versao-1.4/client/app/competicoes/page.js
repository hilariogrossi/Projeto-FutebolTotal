'use client'

import Header from "../Header";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from './page.module.css';

export default function Competicoes() {

    const [competicoes, setCompeticoes] = useState([]);
    const [ranking, setRanking] = useState([]);

    useEffect(() => {

        axios.get('http://api.futeboltotal.cloud/jogos')
            .then(response => setCompeticoes(response.data))
            .catch(error => console.error('Erro ao obter dados do servidor:', error));

        axios.get('http://api.futeboltotal.cloud/rank_brasileirao')
            .then(response => setRanking(response.data))
            .catch(error => console.error('Erro ao obter dados do servidor:', error));

    }, []);

    return (
        <>
            <Header />

            <h1 className={styles.h1}>Brasileirão 2023</h1>

            <div className={styles.container}>

                {ranking.length > 0 ? (

                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.items}>
                                <th className={styles.tamanho1}>Posição</th>
                                <th className={styles.tamanho2}>Time</th>
                                <th className={styles.tamanho1}>Jogos</th>
                                <th className={styles.tamanho1}>Vitórias</th>
                                <th className={styles.tamanho1}>Empates</th>
                                <th className={styles.tamanho1}>Derrotas</th>
                                <th className={styles.tamanho3}>Gols Marcados</th>
                                <th className={styles.tamanho3}>Gols Sofridos</th>
                                <th className={styles.tamanho3}>Saldo de Gols</th>
                                <th className={styles.tamanho1}>Pontos</th>

                            </tr>

                        </thead>

                        <tbody>
                            {ranking.map((time, index) => (
                                
                                <tr key={time.id} className={styles.items}>
                                    <td className={styles.padding1}>{index + 1}</td>
                                    <td>{time.nome_time}</td>
                                    <td className={styles.padding2}>{time.jogos}</td>
                                    <td className={styles.padding2}>{time.vitorias}</td>
                                    <td className={styles.padding2}>{time.empates}</td>
                                    <td className={styles.padding2}>{time.derrotas}</td>
                                    <td className={styles.padding3}>{time.gols_marcados}</td>
                                    <td className={styles.padding3}>{time.gols_sofridos}</td>
                                    <td className={styles.padding3}>{time.saldo_de_gols}</td>
                                    <td className={styles.padding2}>{time.pontos}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                ) : (

                    <p>Não há dados de classificação disponíveis.</p>

                )}

            </div>

        </>

    );

}
