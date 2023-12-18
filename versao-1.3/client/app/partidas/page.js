'use client'

import Header from "../Header";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from './page.module.css'

export default function Partidas() {

    const [partidas, setPartidas] = useState([]);

    // let dataOriginal = partidas.data_jogo;
    // let dataFormatada = new Date(dataOriginal);
    // let novoFormato = dataFormatada.toLocaleDateString('pt-BR', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric',
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     timeZone: "UTC"

    // });

    useEffect(() => {

        axios.get('http://localhost:3001/jogos')
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
                        .map(partida => (
                            <li key={partida.id}>
                                {partida.nome_time_casa} vs {partida.nome_time_visitante} <br />
                                <span>Data do Jogo: </span> {partida.data_jogo} <br />
                                <span>Local do Jogo: </span> {partida.estadio_nome} <br />
                                <span>Árbitro: </span> {partida.arbitro}

                        </li>
                        
                    ))}

                </ul>

            </div>

        </>

    );

}
