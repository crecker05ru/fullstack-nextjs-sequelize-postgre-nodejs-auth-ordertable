import { error } from "console"
import React from "react"
import {Container, Form,Card,Row,Button} from "react-bootstrap";
import { useRouter } from 'next/router'

const SentMessage = () => {
    const router = useRouter()

    return(
        <div>
            <Container
            className="d-flex justify-content-center align-items-center"
            // style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h4 className="m-auto">Письмо было отправлено вам на почту</h4>
                <Form className="d-flex flex-column">
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                       
                        <Button
                            onClick={()=> router.push("/auth")}
                        >
                            Вернуться на страницу авторизации
                        </Button>
                 
                    </Row>

                </Form>
            </Card>
        </Container>
        </div>
    )
}

export default SentMessage