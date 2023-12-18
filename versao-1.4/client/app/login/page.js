'use client'

import Image from 'next/image';
import styles from './login.module.css';
import { useState } from 'react';
import Header from '../Header';

function Login() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');

  const submitLogin = async function (e) {
    e.preventDefault();

    // Construir o objeto de dados para enviar no corpo da requisição
    const formData = {
      email: email,
      senha: password,
    };

    // Fazer a requisição usando a Fetch API
    const loginData = await fetch('http://api.futeboltotal.cloud/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adicione outros cabeçalhos conforme necessário
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {

        if (data.error) {
          alert(data.error);
          return false;
        }    
        // Lógica para lidar com a resposta da requisição
        localStorage.setItem('token', data.token);
        localStorage.setItem('nome', data.nome);
        localStorage.setItem('email', data.email);

        console.log('Resposta da requisição:', data);

        alert('Login bem sucedido!')
        setTimeout(function(){
          window.location.href = '/';
        }, 300)
      })
      .catch(error => {
        // Lidar com erros durante a requisição
        console.error('Erro na requisição:', error);
      });
  };

  return (

    <>

      <Header />

      <div className={styles.container}>
        <div className={styles.containerLogin}>
          <div className={styles.wrapLogin}>
            <form className={styles.loginForm} onSubmit={submitLogin}>
              <span className={styles.loginFormTitle}>Bem-vindo ao FT!</span>

              <span className={styles.loginFormTitle}><Image src='/images/boladefogo.png' width={50} height={50} alt='Imagem Bola de Fogo' /></span>

              <div className={styles.wrapInput}>
                <input
                  className={`${styles.input} ${password !== '' ? styles['hasVal'] : ''}`}
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Email'></span>

              </div>

              <div className={styles.wrapInput}>
                <input
                  className={`${styles.input} ${password !== '' ? styles['hasVal'] : ''}`}
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Senha'></span>

              </div>

              <div className={styles.containerLoginFormBtn}>
                <button className={styles.loginFormBtn}>Entrar</button>

              </div>

              <div className={styles.textCenter}>
                <span className={styles.txt1}>Não possui conta?</span>

                <a className={styles.txt2} href='#'>Criar Conta</a>

              </div>

            </form>

          </div>

        </div>

      </div>

    </>

  );

}

export default Login;
