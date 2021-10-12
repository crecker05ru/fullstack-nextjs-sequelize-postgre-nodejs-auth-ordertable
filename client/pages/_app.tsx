import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { NavigationBar } from '../components/NavigationBar';
import { store } from "../store/";
import '../styles/globals.css';
import { FooterBar } from '../components/footerBar';

import Home from "../chat/Home";

import { useRouter } from 'next/router'
import Username from './chat/[roomname]/[username]'





function MyApp({ Component, pageProps }:AppProps ) {

  return (
  <Provider store={store}>
    <NavigationBar/>

    <Component {...pageProps} />
    
    <FooterBar />
  </Provider>
  )
}

export default MyApp
