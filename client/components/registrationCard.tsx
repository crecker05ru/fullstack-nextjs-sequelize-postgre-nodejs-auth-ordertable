import { useState } from "react"
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

export default function RegistrationCard () {
    const [email,setEmail] = useState('')
    const [name, setName] = useState('')
    const [password,setPassword] = useState('')
    const {registerUser} = useActions()
    const {error,loading,user,isAuth} = useTypedSelector(state => state.user)
    const register = async () => {
        registerUser(email,name,password)
    }
    // const register =  async () => {
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
    if(isAuth){
        return <h2>Logged</h2>
    }

    return(
        <div>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}></input>
            <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
            <button onClick={register}>Register</button>
        </div>
    )
}