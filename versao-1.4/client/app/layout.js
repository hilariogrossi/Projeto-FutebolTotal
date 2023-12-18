import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Futebol Total',
  description: 'Site sobre Futebol',

}

export default function RootLayout({ children }) {

  return (
    <html lang="pt-BR" className={styles.html}>

      <Head>
        <Link rel='icon' href='/boladefogo.ico' />

      </Head>

      <body className={inter.className}>
        <div>
          {children}

        </div>

      </body>

    </html>

  );

}
