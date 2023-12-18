'use client'

import Header from "../Header";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from './page.module.css';

export default function Competicoes() {

    const [competicoes, setCompeticoes] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:3001/jogos')
          .then(response => setCompeticoes(response.data))
          .catch(error => console.error('Erro ao obter dados do servidor:', error));

      }, []);

    return (
        <>
            <Header />

            <h1 className={styles.h1}>Competições de Futebol</h1>

            <div className={styles.container}>
                <ul>
                    {competicoes
                        .slice()
                        .sort((a, b) => a.nome_time_casa.localeCompare(b.nome_time_casa))
                        .map(competicoes => (
                            <li key={competicoes.id}>
                                {competicoes.nome_time_casa} vs {competicoes.nome_time_visitante}
                            
                        </li>
                        
                    ))}

                </ul>

            </div>

        </>

    );

}
