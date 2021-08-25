import axios from "axios";
import { useState, useEffect } from "react"
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

export default function LogIn () {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {loginUser,logoutUser,authUser} = useActions()
    const {isAuth,user} = useTypedSelector(state => state.user)
    console.log('isAuth,user',isAuth,user)
    const logIn = async () => {
        loginUser(email,password)
    }
    const logOut = async () => {
        logoutUser()
    }
    useEffect( () =>{
        authUser()
    },[])
    
    


    // const logIn =  async () => {
    //     try{
    //         const response = await fetch("http://localhost:3001/api/user/registration",{
    //             method: "POST",
    //             body: JSON.stringify({email,name,password}),
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //         })
    //         const json = await response.json()
    //         console.log("success",JSON.stringify(json))
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    return(
        <div>
            
            { isAuth ? <button onClick={logOut}>Log out</button> 
            
            :  <><input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
            <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
            <button onClick={logIn}>Log in</button></>}
            
            
        </div>
    )
}