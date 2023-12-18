'use client'

import Image from 'next/image';
import styles from './cadastro.module.css';
import { useState } from 'react';
import Header from '../Header';

function Cadastro() {

  const [nome, SetNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitRegister = async function (e) {
    e.preventDefault();

    const formData = {
      email: email,
      senha: password,
      nome: nome
    
    };

    // Fazer a requisição usando a Fetch API
    const loginData = await fetch('http://api.futeboltotal.cloud/usuario/novo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formData),

    })
      .then(response => response.json())
      .then(data => {

        if (data.error) {
          alert(data.error);
          return false;

        }    

        localStorage.setItem('token', data.token);
        localStorage.setItem('nome', data.nome);
        localStorage.setItem('email', data.email);

        console.log('Resposta da requisição:', data);

        alert('Cadastrado com sucesso!')

        setTimeout(function() {
          window.location.href = '/';

        }, 300)

      })

      .catch(error => {
        console.error('Erro na requisição:', error);

      });

  };


  return (

    <>

      <Header />
    
      <div className={styles.container}>
        <div className={styles.containerLogin}>
          <div className={styles.wrapLogin}>
            <form className={styles.loginForm} onSubmit={submitRegister}>
              <span className={styles.loginFormTitle}>Bem-vindo ao FT!</span>

              <span className={styles.loginFormTitle}><Image src='/images/boladefogo.png' width={50} height={50} alt='Imagem Bola de Fogo' /></span>

              <div className={styles.wrapInput}>
                <input 
                  className={`${styles.input} ${password !== '' ? styles['has-val'] : ''}`}
                  type='name' 
                  value={nome}
                  id='nome'
                  onChange={e => SetNome(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Nome'></span>

              </div>
              
              <div className={styles.wrapInput}>
                <input 
                  className={`${styles.input} ${password !== '' ? styles['hasVal'] : ''}`}
                  type='email' 
                  value={email}
                  id='email'
                  onChange={e => setEmail(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Email'></span>

              </div>

              <div className={styles.wrapInput}>
                <input 
                  className={`${styles.input} ${password !== '' ? styles['hasVal'] : ''}`} 
                  type='password' 
                  value={password}
                  id='senha'
                  onChange={e => setPassword(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Senha'></span>

              </div>

              <div className={styles.containerLoginFormBtn}>
                <button className={styles.loginFormBtn}>Criar Conta</button>

              </div>

              <div className={styles.textCenter}>
                <span className={styles.txt1}>Cadastro Completo?</span>

                <a className={styles.txt2} href='/completo'>Clique Aqui</a>

              </div>

            </form>

          </div>

        </div>

      </div>

    </>

  );

}

export default Cadastro;
