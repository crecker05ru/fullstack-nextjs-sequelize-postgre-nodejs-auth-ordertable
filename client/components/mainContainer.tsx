
import { useTypedSelector } from './hooks/useTypedSelector';
import UsersCard from './usersCard';
import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import Auth from "../pages/auth"
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MainContainer () {
    const {fetchAuthData} = useActions()
    const {authData,isAuth,error,loading} = useTypedSelector(state => state.authData)

    useEffect(()=>{
        console.log("window.innerHeight", window.innerHeight);
    },[])

    useEffect(()=> {
        fetchAuthData()
    },[])


    // if(!isAuth){
    //     return <><Auth/></>
    // }
    //     if(typeof window !== "undefined"){
    //     return <><Auth/></>
    // }
    return (
        <>
        <h2>1. Решить проблему с auth при входе на страницу X</h2>
        <h2>2. Адаптив: оверлэй на инпуты</h2>
        {/* <Auth/> */}

        {/* {typeof window !== "undefined"  && !isAuth
        ? <><Auth/></> 
        :<><UsersCard/></>} */}
        <UsersCard/>
        
        </>
    )
}