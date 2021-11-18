
import { useTypedSelector } from './hooks/useTypedSelector';
import UsersCard from './usersCard';
import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import Auth from "../pages/auth"
import Link from 'next/link'
import { useRouter } from 'next/router'
import app_screen from '../public/app_screen.png'
import Image from 'next/image'


export default function MainContainer () {
    const router = useRouter()
    const {fetchAuthData} = useActions()
    const {authData,isAuth,error,loading} = useTypedSelector(state => state.authData)

    useEffect(()=>{
        // console.log("window.innerHeight", window.innerHeight);
    },[])

    useEffect(()=> {
        if(localStorage.getItem('token')){
            fetchAuthData()
        }
        
    },[])

    // if(loading){
    //     return <><Spiner/></>
    // }
    // if(!isAuth){
    //     return <><Auth/></>
    // }
    //     if(typeof window !== "undefined"){
    //     return <><Auth/></>
    // }
    return (
        <>
        <h2>Таблица заказов</h2>
        
        {/* <SocketIo/> */}
        {/* <Auth/> */}

        {/* {typeof window !== "undefined"  && !isAuth
        ? router.push('/auth')
        :<><UsersCard/></>} */}
        {/* <UsersCard/> */}
        {loading 
        ? <> 
        </>
        : <>
                {isAuth
                ? <div>
                    
                    <UsersCard/> 

                    </div>
                : <div><h3>Войдите в учетную запись чтобы добавлять и просматривать заказы</h3> 
                    <div className="d-flex justify-content-center"><Image src={"/app_screen.png"} alt="app screen" width={500} height={300}/></div>
                    {/* <Auth/> */}
                    <button className="btn btn-info" onClick={() => router.push('/auth')}>Авторизоваться</button>
                </div>}
        </>
        }


        
        </>
    )
}