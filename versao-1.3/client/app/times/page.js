'use client'

import Header from "../Header";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from './page.module.css'

export default function Times() {

    const [times, setTimes] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:3001/times')
          .then(response => setTimes(response.data))
          .catch(error => console.error('Erro ao obter dados do servidor:', error));

      }, []);

    return (
        <>
            <Header />

            <h1 className={styles.h1}>Times de Futebol - Brasileirão - Série A</h1>

            <div className={styles.container}>
                <ul>
                    {Array.isArray(times) && times.length > 0 ?
                        times
                            .slice()
                            .sort((a, b) => a.nome.localeCompare(b.nome))
                            .map(times => (
                                <li key={times.id}>
                                    <span>Nome do Time: </span> {times.nome} <br />
                                    <span>Ano de Fundação: </span> {times.ano_fundacao} <br />
                                    <span>Cidade, Estado: </span> {times.cidade_estadio}
                                
                                </li>
                        
                            ))
                        
                        : <li>Nenhum time disponível!</li>
                    
                    }

                </ul>

            </div>

        </>

    );

}
