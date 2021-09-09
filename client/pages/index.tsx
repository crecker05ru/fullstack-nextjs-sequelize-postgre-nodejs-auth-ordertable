import Head from 'next/head'
import Image from 'next/image'
import Order from '../components/orders'
import styles from '../styles/Home.module.css'
import OrderList from "../components/orderList"
import UserCard from '../components/userCard'
import RegistrationCard from '../components/registrationCard'
import LogIn from '../components/logIn'
import { Provider } from 'react-redux'
import {store} from "../store/"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  console.log('NEXT_PUBLIC_ENV_VARIABLE',process.env.NEXT_PUBLIC_ENV_VARIABLE)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Order Table
        </h1>
        <Provider store={store}>
          <LogIn />
          <RegistrationCard/>
            <UserCard />
          </Provider>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
