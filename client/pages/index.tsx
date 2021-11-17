import Head from 'next/head'

import styles from '../styles/Home.module.css'

import MainContainer from '../components/mainContainer'
import { Container, Navbar } from 'react-bootstrap'


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
  // console.log('NEXT_PUBLIC_ENV_VARIABLE',process.env.NEXT_PUBLIC_ENV_VARIABLE)
  return (
    <div className={styles.container}>
      
      <Head>
        <title>Order table</title>
        <meta name="order-table app" content="order-table app" />
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
