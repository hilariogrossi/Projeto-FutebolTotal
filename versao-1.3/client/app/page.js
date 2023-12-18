'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Header from './Header';

// const Noticia = ({ title, content }) => (
//   <div>
//     <h2>{title}</h2>

//     <p>{content}</p>

//   </div>

// );

export default function Home() {

  // const [noticias, setNoticias] = useState([]);

  // useEffect(() => {

  //   const fetchData = async () => {

  //     try {
  //       const response = await axios.get('http://localhost:3000/noticias-r7');

  //       setNoticias(response.data);

  //     } catch (error) {
  //       console.error('Erro ao buscar API', error);

  //     }

  //   };

  //   fetchData();

  // }, []);

  // console.log('Notícias: ', noticias);

  return (
    <>
      <Header />

      {/* <div className={styles.noticias}>
        {noticias && noticias.length > 0 ? (
          noticias.map((noticia, index) => (
            <div key={index} className={styles.noticias_row}>
              <div className={styles.noticia_1}>
                <Noticia title={noticia.title} content={noticia.content} />

              </div>

            </div>

          ))
        
        ) : (
          <p>Nenhuma notícia encontrada.</p>

        )}

      </div> */}



      <div className={styles.noticias}>
            <div className={styles.noticias_row}>
              <div className={styles.noticia_1}>
                <iframe src="https://g1.globo.com/"></iframe>
        
              </div>

              <div className={styles.noticia_2}>
                <iframe src="https://www.ogol.com.br/"></iframe>

              </div>

            </div>

            <div className={styles.noticias_row}>
              <div className={styles.noticia_3}>
                <iframe src="https://ge.globo.com/"></iframe>

              </div>

              <div className={styles.noticia_4}>
                <iframe src="https://www.cbf.com.br/"></iframe>

              </div>

            </div>

        </div>

    </>
    
  );

}


//0fb0b8136798f59663b11fc488a581ef0a26e2e89728124c0012da47dfa715ba
