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
                      <span>Estatísticas:</span><br/>
                      <span>{`Jogos em casa: ${estatisticas[time.id].jogos_casa}`}</span><br/>
                      <span>{`Jogos Fora: ${estatisticas[time.id].jogos_fora}`}</span><br/>
                      <span>{`Jogos Totais: ${estatisticas[time.id].jogos_totais}`}</span><br/>
                      <span>{`Vitórias em casa: ${estatisticas[time.id].vitorias_casa}`}</span><br/>
                      <span>{`Vitórias Fora: ${estatisticas[time.id].vitorias_fora}`}</span><br/>
                      <span>{`Empates em casa: ${estatisticas[time.id].empates_casa}`}</span><br/>
                      <span>{`Empates fora: ${estatisticas[time.id].empates_fora}`}</span><br/>
                      <span>{`Vitórias Totais: ${estatisticas[time.id].vitorias_totais}`}</span><br/>
                      <span>{`Empates Totais: ${estatisticas[time.id].empates_totais}`}</span><br/>
                      <span>{`Derrotas em casa: ${estatisticas[time.id].derrotas_casa}`}</span><br/>
                      <span>{`Derrotas fora: ${estatisticas[time.id].derrotas_fora}`}</span><br/>
                      <span>{`Derrotas Totais: ${estatisticas[time.id].derrotas_totais}`}</span><br/>
                      <span>{`Gols Totais: ${estatisticas[time.id].gols_totais}`}</span><br/>
                      <span>{`Gols em casa: ${estatisticas[time.id].gols_casa}`}</span><br/>
                      <span>{`Gols Fora: ${estatisticas[time.id].gols_fora}`}</span><br/>
                      <span>{`Gols Sofridos: ${estatisticas[time.id].gols_sofridos}`}</span><br/>
                      <span>{`Não sofreu gol em casa: ${estatisticas[time.id].nao_sofreu_gol_casa}`}</span><br/>
                      <span>{`Não sofreu gol fora: ${estatisticas[time.id].nao_sofreu_gol_fora}`}</span><br/>
                      <span>{`Não marcou gol em casa: ${estatisticas[time.id].nao_marcou_gol_casa}`}</span><br/>
                      <span>{`Não marcou gol fora: ${estatisticas[time.id].nao_marcou_gol_fora}`}</span><br/>
                      <span>{`Pênaltis convertidos: ${estatisticas[time.id].penaltis_convertidos}`}</span><br/>
                      <span>{`Pênaltis perdidos: ${estatisticas[time.id].penaltis_perdidos}`}</span><br/>
                      <span>{`Pênaltis totais: ${estatisticas[time.id].penaltis_totais}`}</span><br/>
                      <span>{`Cartões Amarelos: ${estatisticas[time.id].cartoes_amarelos}`}</span><br/>
                      <span>{`Cartões Vermelhos: ${estatisticas[time.id].cartoes_vermelhos}`}</span><br/>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }