import axios from "axios";
import { useState, useEffect,useContext } from "react"
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import { useRouter } from 'next/router'

export default function LogIn () {
    const router = useRouter()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name, setName] = useState('')
    
    const [emailIsBlur,setEmailIsBlur] = useState(false)
    const [passwordIsBlur,setPasswordIsBlur] = useState(false)
    const [nameIsBlur, setNameIsBlur] = useState(false)
    
    const [emailError,setEmailError] = useState('Email не может быть пустым')
    const [passwordError,setPasswordError] = useState('Пароль не может быть пустым')
    const [nameError, setNameError] = useState('Имя не может быть пустым')
    
    const [formValid,setFormValid] = useState(false)

    const {loginUser,logoutUser,authUser,fetchAuthData,registerUser,forgetPasswordRequest} = useActions()
    const {isAuth,user,error} = useTypedSelector(state => state.user)
    const [loginPage,setLoginPage] = useState(true)
    const [forgetPasswordPage,setForgetPasswordPage] = useState(false)

    // console.log('isAuth,user',isAuth,user)

    useEffect(()=> {
        if(emailError || (passwordError && !forgetPasswordPage) ||(!loginPage&&nameError)){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    },[emailError, passwordError,nameError])

    // useEffect(()=>{
    //     router.reload()
    // },[])

    const blurHandler = (e) => {
        switch(e.target.name){
            case "email":
                setEmailIsBlur(true)
                 break
            case "password":
                setPasswordIsBlur(true)    
                 break
            case "name":
                setNameIsBlur(true)
        }
    }    

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError("Не похоже на email")
        }else{
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 4 || e.target.value.length > 8){
            setPasswordError("Пароль должен содержать не меньше 4 и не больше 8 символов")
            if(!e.target.value){
                setPasswordError("Пароль не должен быть пустым")
            }
        }else{
            setPasswordError("")
        }
    }
    const nameHandler = (e) => {
        setName(e.target.value)
        if(e.target.value.length < 4){
            setNameError("Имя должно содержать не менее 4 символов")
        }else{
            setNameError("")
        }
    }


    const logIn = async () => {
        loginUser(email,password)
    }
    const register = async () => {
        registerUser(email,name,password)
    }
    const logOut = async () => {
        logoutUser()
    }
    const forgetPassword = async () => {
        forgetPasswordRequest(email)
    }
    // useEffect(()=>{
    //     fetchAuthData()
    // },[])
    useEffect( () =>{
        if(localStorage.getItem('token')){
            authUser()
        }
        
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
    const forgetPasswordSwitch = () => {
        setForgetPasswordPage(!forgetPasswordPage)
    }

    if(isAuth){
        router.push("/")
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
    if(forgetPasswordPage){
        return (<>
            <Container
            className="d-flex justify-content-center align-items-center"
            // style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Сбросить пароль</h2>
                <Form className="d-flex flex-column">
                    {(emailIsBlur && emailError) && <div className="text-danger">{emailError}</div>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        name="email"
                        onChange={e => emailHandler(e)}
                        onBlur={e => blurHandler(e)}
                        
                    />
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
                        <div>
                                <span className="link-info pe-auto" onClick={forgetPasswordSwitch}>Забыли пароль?</span>
                        </div>
                        <Button
                            variant={"btn btn-primary"}
                            onClick={forgetPassword}
                            disabled={!formValid}
                        >
                            Сбросить
                        </Button>
                        {error ? <div className="text-danger">  {error}</div> : <></>}
                    </Row>

                </Form>
            </Card>
        </Container>
        </>) 
    }
    return(
        <div>
            
            {/* { isAuth ? <button onClick={logOut}>Log out</button> 
            
            :  <><input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
            <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
            <button onClick={logIn} className="btn btn-success">Log in</button></>} */}
            <Container
            className="d-flex justify-content-center align-items-center"
            // style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{loginPage ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {(emailIsBlur && emailError) && <div className="text-danger">{emailError}</div>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        name="email"
                        onChange={e => emailHandler(e)}
                        onBlur={e => blurHandler(e)}
                        
                    />
                    {/* <input  className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        name="email"
                        onBlur={e => blurHandler(e)}
                        onChange={e => emailHandler(e)}/> */}

                    {(passwordIsBlur && passwordError) && <div className="text-danger">{passwordError}</div>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        name="password"
                        onChange={e => passwordHandler(e)}
                        onBlur={e => blurHandler(e)}
                       
                        type="password"
                    />
                                       {/* <input className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        name="password"
                        onChange={e => passwordHandler(e)}
                        onBlur={e => blurHandler(e)}
                        type="password" /> */}
                    {loginPage 
                    ? <></>
                : <> {(nameIsBlur && nameError) && <div className="text-danger">{nameError}</div>}
                <Form.Control
                className="mt-3"
                placeholder="Введите имя"
                value={name}
                name="name"
                onChange={e => nameHandler(e)} 
                onBlur={e => blurHandler(e)}
                /> 
                </>
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
                        <div>
                                <span className="link-info pe-auto" onClick={forgetPasswordSwitch}>Забыли пароль?</span>
                        </div>
                        <Button
                            variant={"btn btn-primary"}
                            onClick={click}
                            disabled={!formValid}
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