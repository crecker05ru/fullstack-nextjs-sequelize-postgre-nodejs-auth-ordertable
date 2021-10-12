import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import styles from '../styles/websocket.module.css'
import {BsFillChatRightTextFill} from 'react-icons/bs'

const WebSock = ({userName}) => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState(userName)
    const [showChat,setShowChat] = useState(false)

    function connect() {
        socket.current = new WebSocket('ws://localhost:3002')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }

    }
    // useEffect(()=> {
    //     connect()
    // },[])

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }

  const showChatHandler = () => {
        setShowChat(!showChat)
        if(!connected){
            connect()
        }
    }
    if(!showChat){
        return (
            <button className={styles.showChatButton} onClick={showChatHandler}>Open  <BsFillChatRightTextFill/></button>
        )
    }

    if (!connected) {
        return (
            <div className={styles.chatForm}>
            {/* <div className="center">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя"/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div> */}
            <div>Loading</div>
            </div>
        )
    }


    return (
        <div className={styles.chatForm}>
        <div className="center">
            <div>
                <div className={styles.chatHeader}>
                    <input className={styles.inputText} value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage} className={styles.buttonSend}>Отправить</button>
                    <button onClick={() => setShowChat(!showChat)} className={styles.buttonClose}>X</button>
                </div>
                <div className={styles.messagesForm}>
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div>
                                     <span className={userName == username ? styles.activeUser : styles.otherUsers}>{mess.username}</span>: {mess.message}
                                     <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                   
                                </div>
                                    </div>
                                    
                                : <div className={styles.messages}>
                                    <span className={userName == username ? styles.activeUser : styles.otherUsers}>{mess.username}</span>: {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default WebSock;