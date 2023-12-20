'use client'

import Header from "../Header";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from './page.module.css'

export default function Times() {
    const [times, setTimes] = useState([]);
    const [estatisticas, setEstatisticas] = useState({});
  
    useEffect(() => {

      axios.get('http://api.futeboltotal.cloud/times')
        .then(response => setTimes(response.data))
        .catch(error => console.error('Erro ao obter dados do servidor:', error));

    }, []);
  
    const fetchEstatisticas = async (timeId) => {

      try {
        const response = await axios.get(`http://api.futeboltotal.cloud/times_estatisticas/${timeId}`);
        setEstatisticas({ ...estatisticas, [timeId]: response.data[0] });

      } catch (error) {
        console.error('Erro ao obter estatísticas do time:', error);

      }

    };
  
    const openEstatisticas = (timeId) => {
      setEstatisticas({})

      if (!estatisticas[timeId]) {
        fetchEstatisticas(timeId);

      } 

    };
  
    return (
      
      <>
        <Header />
  
        <h1 className={styles.h1}>Times de Futebol - Brasileirão - Série A</h1>
  
        <div className={styles.container}>
          <ul>
            {times
              .slice()
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map(time => (
                
                <li key={time.id}>
                  <span>Nome do Time: </span> {time.nome} <br />
                  <span>Ano de Fundação: </span> {time.ano_fundacao} <br />
                  <span>Cidade, Estado: </span> {time.cidade_estadio}
                  <button onClick={() => openEstatisticas(time.id)} className={styles.button}>+ infos</button>
                  {estatisticas[time.id] && (

                    <div>
                      <br/ >
                      <span>Estatísticas:</span><br/ >
                      <span>Jogos Totais: <a className={styles.colorStatistics}>{`${estatisticas[time.id].jogos_totais}`}</a></span> <br/ >
                      <span>Jogos em casa: <a className={styles.colorStatistics}>{`${estatisticas[time.id].jogos_casa}`}</a></span> <br/ >
                      <span>Jogos Fora: <a className={styles.colorStatistics}>{`${estatisticas[time.id].jogos_fora}`}</a></span> <br/>
                      <span>Vitórias em casa: <a className={styles.colorStatistics}>{`${estatisticas[time.id].vitorias_casa}`}</a></span> <br/ >
                      <span>Vitórias Fora: <a className={styles.colorStatistics}>{`${estatisticas[time.id].vitorias_fora}`}</a></span> <br/ >
                      <span>Empates em casa: <a className={styles.colorStatistics}>{`${estatisticas[time.id].empates_casa}`}</a></span> <br />
                      <span>Empates fora: <a className={styles.colorStatistics}>{`${estatisticas[time.id].empates_fora}`}</a></span> <br />
                      <span>Vitórias Totais: <a className={styles.colorStatistics}>{`${estatisticas[time.id].vitorias_totais}`}</a></span> <br />
                      <span>Empates Totais: <a className={styles.colorStatistics}>{`${estatisticas[time.id].empates_totais}`}</a></span> <br />
                      <span>Derrotas em casa: <a className={styles.colorStatistics}>{`${estatisticas[time.id].derrotas_casa}`}</a></span> <br />
                      <span>Derrotas fora: <a className={styles.colorStatistics}>{`${estatisticas[time.id].derrotas_fora}`}</a></span> <br />
                      <span>Derrotas Totais: <a className={styles.colorStatistics}>{`${estatisticas[time.id].derrotas_totais}`}</a></span> <br />
                      <span>Gols em casa: <a className={styles.colorStatistics}>{`${estatisticas[time.id].gols_casa}`}</a></span> <br />
                      <span>Gols Fora: <a className={styles.colorStatistics}>{`${estatisticas[time.id].gols_fora}`}</a></span> <br />
                      <span>Gols Totais: <a className={styles.colorStatistics}>{`${estatisticas[time.id].gols_totais}`}</a></span> <br />
                      <span>Gols Sofridos: <a className={styles.colorStatistics}>{`${estatisticas[time.id].gols_sofridos}`}</a></span> <br />
                      <span>Não sofreu gol em casa: <a className={styles.colorStatistics}>{`${estatisticas[time.id].nao_sofreu_gol_casa}`}</a></span> <br />
                      <span>Não sofreu gol fora: <a className={styles.colorStatistics}>{`${estatisticas[time.id].nao_sofreu_gol_fora}`}</a></span> <br />
                      <span>Não marcou gol em casa: <a className={styles.colorStatistics}>{`${estatisticas[time.id].nao_marcou_gol_casa}`}</a></span> <br />
                      <span>Não marcou gol fora: <a className={styles.colorStatistics}>{`${estatisticas[time.id].nao_marcou_gol_fora}`}</a></span> <br />
                      <span>Pênaltis convertidos: <a className={styles.colorStatistics}>{`${estatisticas[time.id].penaltis_convertidos}`}</a></span> <br />
                      <span>Pênaltis perdidos: <a className={styles.colorStatistics}>{`${estatisticas[time.id].penaltis_perdidos}`}</a></span>< br />
                      <span>Pênaltis totais: <a className={styles.colorStatistics}>{`${estatisticas[time.id].penaltis_totais}`}</a></span> <br />
                      <span>Cartões Amarelos: <a className={styles.colorStatistics}>{`${estatisticas[time.id].cartoes_amarelos}`}</a></span> <br />
                      <span>Cartões Vermelhos: <a className={styles.colorStatistics}>{`${estatisticas[time.id].cartoes_vermelhos}`}</a></span> <br />

                    </div>

                  )}

                </li>

              ))}

          </ul>

        </div>

      </>

    );

  }
