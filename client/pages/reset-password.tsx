import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import { useActions } from '../components/hooks/useActions';
import {Container, Form,Card,Row,Button} from "react-bootstrap";

const Reset = () => {
    const router = useRouter()
    const { token,id } = router.query
    const [password,setPassword] = useState('')
    const [passwordIsBlur,setPasswordIsBlur] = useState(false)
    const [passwordError,setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid,setFormValid] = useState(false)
    const {resetPasswordRequest} = useActions() 

    const resetPasswordHandler = () => {
        resetPasswordRequest(id,password)
        router.push('/auth')
    }

    useEffect(()=> {
        if(passwordError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    },[passwordError])

    const blurHandler = (e) => {
        switch(e.target.name){
            case "password":
                setPasswordIsBlur(true)    

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



return(

    <div>
            <Container
            className="d-flex justify-content-center align-items-center"
            // style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h4 className="m-auto">Сброс пароля</h4>
                <Form className="d-flex flex-column" >
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    <h5>введите новый пароль</h5>
                    {(passwordIsBlur && passwordError) && <div className="text-danger">{passwordError}</div>}
                   
                    <input name="password" className="border-2 border-radius-5px ms-2"  type="password" value={password} onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)}></input>
                    <Button className="btn btn-success ms-2 mt-2" disabled={!formValid} onClick={resetPasswordHandler}>Отправить</Button>
                 
                    </Row>

                </Form>
            </Card>
        </Container>
        </div>
)
}

export default Reset