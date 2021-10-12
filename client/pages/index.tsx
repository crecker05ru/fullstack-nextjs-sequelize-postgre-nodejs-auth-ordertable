import Head from 'next/head'
import Image from 'next/image'
import Order from '../components/orders'
import styles from '../styles/Home.module.css'
import OrderList from "../components/orderList"
import UsersCard from '../components/usersCard'
import RegistrationCard from '../components/registrationCard'
import LogIn from '../components/logIn'
import { Provider } from 'react-redux'
// import {store} from "../store/"
import io from "socket.io-client";
import MainContainer from '../components/mainContainer'
import { Container, Navbar } from 'react-bootstrap'
import { NavigationBar } from './../components/NavigationBar';
import { FooterBar } from '../components/footerBar'
import Auth from './auth'
import Chat from '../chat/chat'
import HomePage from '../chat/Home'

// const socket = io.connect('/');

// export function Appmain(props) {
//   return (
//     <div>
//       <div className="right">
//         <Chat
//           username={props.username}
//           roomname={props.roomname}
//           socket={socket}
//         />
//       </div>
//       <div className="left">
        
//       </div>
//     </div>
//   );
// }

export default function Home() {
  console.log('NEXT_PUBLIC_ENV_VARIABLE',process.env.NEXT_PUBLIC_ENV_VARIABLE)
  return (
    <div className={styles.container}>
      
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar >
        <Container >
          <Navbar.Brand>
            <div className="text-decoration-none text-white"></div>
          </Navbar.Brand>
        </Container>
        
      </Navbar>

      <main className={styles.main}>        
        {/* <Provider store={store}> */}
            <MainContainer/>
            {/* <HomePage socket={socket} /> */}
            {/* <Auth/> */}
          {/* </Provider> */}
      </main>


      
    </div>
  )
}
