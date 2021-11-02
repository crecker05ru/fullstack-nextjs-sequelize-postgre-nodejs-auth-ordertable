
import { useTypedSelector } from './hooks/useTypedSelector';
import UsersCard from './usersCard';
import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import Auth from "../pages/auth"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Spinner from 'react-bootstrap/Spinner'


export default function MainContainer () {
    const router = useRouter()
    const {fetchAuthData} = useActions()
    const {authData,isAuth,error,loading} = useTypedSelector(state => state.authData)

    useEffect(()=>{
        console.log("window.innerHeight", window.innerHeight);
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
        <h2>1. Решить проблему с auth при входе на страницу X</h2>
        <h2>2. Адаптив: оверлэй на инпуты X</h2>
        <h2>3. Deploy</h2>
        <h2>4. Лендинг-визитка</h2>
        <h2>5. Добавить почту X</h2>
        <h2>6. Разобраться с WebSocket в отдельном модуле (проблема с `let aWss = expressWs.getWss('/echo');`)</h2>
        <h2>7. Добавить fs для WebSocket </h2>

        {/* <SocketIo/> */}
        {/* <Auth/> */}

        {/* {typeof window !== "undefined"  && !isAuth
        ? router.push('/auth')
        :<><UsersCard/></>} */}
        {/* <UsersCard/> */}
        {loading 
        ? <> <Spinner/>
        </>
        : <>
                {isAuth
                ? <div>
                    <UsersCard/> 
                    </div>
                : <div><h3>Войдите в учетную запись чтобы добавлять и просматривать заказы</h3> 
                    {/* <Auth/> */}
                    <button className="btn btn-info" onClick={() => router.push('/auth')}>Авторизоваться</button>
                </div>}
        </>
        }


        
        </>
    )
}