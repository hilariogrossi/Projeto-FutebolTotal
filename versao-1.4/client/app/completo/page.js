'use client'

import Image from 'next/image';
import styles from './cadastro.module.css';
import { useState } from 'react';
import Header from '../Header';

function Cadastro() {

  const [nome, SetNome] = useState('');
  const [endereco, SetEndereco] = useState('');
  const [numero, SetNumero] = useState('');
  const [bairro, SetBairro] = useState('');
  const [cidade, SetCidade] = useState('');
  const [estado, SetEstado] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitRegister = async function (e) {
    e.preventDefault();

    const formData = {
      email: email,
      senha: password,
      nome: nome,
      endereco: endereco,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado:estado,
    
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
        localStorage.setItem('endereco', data.endereco);
        localStorage.setItem('numero', data.numero);
        localStorage.setItem('bairro', data.bairro);
        localStorage.setItem('cidade', data.cidade);
        localStorage.setItem('estado', data.estado);

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
                  type='text' 
                  value={endereco}
                  id='endereco'
                  onChange={e => SetEndereco(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Endereço'></span>

              </div>

              <div className={styles.wrapInput}>
                <input 
                  className={`${styles.input} ${password !== '' ? styles['hasVal'] : ''}`} 
                  type='number' 
                  value={numero}
                  id='numero'
                  onChange={e => SetNumero(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Número'></span>

              </div>

              <div className={styles.wrapInput}>
                <input 
                  className={`${styles.input} ${password !== '' ? styles['hasVal'] : ''}`} 
                  type='text' 
                  value={bairro}
                  id='bairro'
                  onChange={e => SetBairro(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Bairro'></span>

              </div>

              <div className={styles.wrapInput}>
                <input 
                  className={`${styles.input} ${password !== '' ? styles['hasVal'] : ''}`} 
                  type='text' 
                  value={cidade}
                  id='cidade'
                  onChange={e => SetCidade(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Cidade'></span>

              </div>

              <div className={styles.wrapInput}>
                <input 
                  className={`${styles.input} ${password !== '' ? styles['hasVal'] : ''}`} 
                  type='text' 
                  value={estado}
                  id='estado'
                  onChange={e => SetEstado(e.target.value)}

                />

                <span className={styles.focusInput} data-placeholder='Estado'></span>

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

            </form>

          </div>

        </div>

      </div>

    </>

  );

}

export default Cadastro;
