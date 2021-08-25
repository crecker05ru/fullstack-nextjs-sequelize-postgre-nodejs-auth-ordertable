import { useState } from "react"

export default function authPage () {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    return (
        <>
            <div><input value={email} onChange={e => setEmail(e.target.value)} placeholder={"email"}></input></div>
            <div><input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder={"password"}></input></div>
            <button>Регистрация/Войти</button>
        </>
    )
}