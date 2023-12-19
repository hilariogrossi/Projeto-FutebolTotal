'use client'

import Header from "../Header";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from './page.module.css';

export default function Partidas() {

    const [partidas, setPartidas] = useState([]);

    useEffect(() => {

        axios.get('http://api.futeboltotal.cloud/jogos')
          .then(response => setPartidas(response.data))
          .catch(error => console.error('Erro ao obter dados do servidor:', error));

      }, []);

    return (
        <>
            <Header />

            <h1 className={styles.h1}>Partidas de Futebol</h1>

            <div className={styles.container}>
                <ul>
                    {partidas
                        .slice()
                        .sort((a, b) => a.data_jogo.localeCompare(b.data_jogo))
                        .map(partida => {

                            const dataHoraJogo = new Date(partida.data_jogo);
                            dataHoraJogo.setHours(dataHoraJogo.getHours() + 3);

                            return (

                                <li key={partida.id}>
                                {partida.nome_time_casa} vs {partida.nome_time_visitante} <br />
                                <span>Data do Jogo: </span> <span className={styles.style}> {dataHoraJogo.toLocaleString()} </span> <br />
                                <span>Local do Jogo: </span> <span className={styles.style}> {partida.estadio_nome} </span> <br />
                                <span>Árbitro: </span> <span className={styles.style}> {partida.arbitro} </span>

                        </li>

                        )}
                        
                    )}

                </ul>
 
            </div>

        </>

    );

}
