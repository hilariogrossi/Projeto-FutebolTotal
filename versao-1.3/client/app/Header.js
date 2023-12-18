'use client'

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

export default function Header() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {

    async function validarToken() {

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token ausente');
          return;

        }

        const response = await fetch(`http://api.futeboltotal.cloud/usuario/validar-token?token=${token}`, {
          
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',

          },

        });

        if (response.ok) {
          console.log('Token válido');
          setNome(localStorage.getItem('nome'))
          setEmail(localStorage.getItem('email'))

        } else {
          console.error('Erro ao validar o token:', response.statusText);

          if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('nome');

          }

          setNome('');
          setEmail('');

        }

      } catch (error) {
        console.error('Erro ao validar o token:', error);

        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('nome');

        }

        setNome('');
        setEmail('');

      }

    }

    validarToken();

  }, []);

  const logout = function() {

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('nome');

    }

    setNome('');
    setEmail('');

  } 

  return (

    <div>
      <nav id={styles.cabecalho}>

        <a href="/" className="logo">
          <Image src="/images/boladefogo.png" width={55} height={55} />

        </a>

        <a href="/" className='tag-a'>
          <p className="frase">FutebolTotal</p>

        </a>

        <span className={styles.span_1}>
          <a href="/partidas" className='tag-a' target='_blank'>Partidas</a>

        </span>

        <span className={styles.span_1}>
          <a href="/times" className='tag-a' target='_blank'>Times</a>

        </span>

        <span className={styles.span_1}>
          <a href="/competicoes" className='tag-a' target='_blank'>Competições</a>

        </span>

        {/* <span className={styles.span_1}>
                <a href="/procurar" className='tag-a' target='_blank'>
                  <Image src="/images/lupa.png" width={30} height={30} alt='Lupa' />
                  
                </a>

            </span> */}

        <span className={styles.span_1}>
          <Image src="/images/pipeline.png" width={30} height={30} alt='Pipeline'/>

        </span>

        {/* <span className={styles.span_1}>
              <a href="/configuracoes" className='tag-a' target='_blank'>
                <Image src="/images/engrenagem.svg" width={50} height={50} alt='Configurações' />

              </a>

            </span> */}

        {nome === '' && (

          <>
            <span className={styles.span_1}>
              <a href="/cadastro" className="btn cadastro" target="_blank">
                Cadastre-se

              </a>

            </span>

            <span className={styles.span_1}>
              <a href="/login" className="btn entrar" target="_blank">
                Entrar

              </a>

            </span>

          </>

        )}

        {nome != '' && (

          <>
            <h2>Olá {nome}, seja bem-vindo(a) !&nbsp;</h2>

            <a href="/" className={styles.logout} onClick={logout}>Sair</a>

          </>

        )}

      </nav>

    </div>


  );

}
