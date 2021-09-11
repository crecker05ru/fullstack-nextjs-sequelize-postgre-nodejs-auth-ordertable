import axios from "axios";
import { useState, useEffect,useContext } from "react"
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";

export default function LogIn () {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name, setName] = useState('')
    const {loginUser,logoutUser,authUser,fetchAuthData,registerUser} = useActions()
    const {isAuth,user,error} = useTypedSelector(state => state.user)
    const [loginPage,setLoginPage] = useState(true)

    console.log('isAuth,user',isAuth,user)

    const logIn = async () => {
        loginUser(email,password)
    }
    const register = async () => {
        registerUser(email,name,password)
    }
    const logOut = async () => {
        logoutUser()
    }
    useEffect(()=>{
        fetchAuthData()
    },[])
    useEffect( () =>{
        authUser()
    },[])
    
    const click = () => {
        try{
            if (loginPage) {
                loginUser(email,password)
            } else {
                registerUser(email,name,password)
            }
        }catch(e){
            console.log(e)
        }

    }


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
            
            {/* { isAuth ? <button onClick={logOut}>Log out</button> 
            
            :  <><input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
            <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
            <button onClick={logIn} className="btn btn-success">Log in</button></>} */}
            <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{loginPage ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    {loginPage 
                    ? <></>
                : <Form.Control
                className="mt-3"
                placeholder="Введите имя"
                value={name}
                onChange={e => setName(e.target.value)}/> 
                 }
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {loginPage ?
                            <div>
                                Нет аккаунта? <span className="link-info pe-auto"   onClick={() => setLoginPage(!loginPage)}>Зарегистрируйся!</span>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <span className="link-info pe-auto" onClick={() =>setLoginPage(!loginPage)}>Войдите!</span>
                            </div>
                        }
                        <Button
                            variant={"btn btn-primary"}
                            onClick={click}
                        >
                            {loginPage ? 'Войти' : 'Регистрация'}
                        </Button>
                        {error ? <div className="text-danger">  {error}</div> : <></>}
                    </Row>

                </Form>
            </Card>
        </Container>
            
            
        </div>
    )
}