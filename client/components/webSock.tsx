import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import styles from '../styles/websocket.module.css'
import {BsFillChatRightTextFill} from 'react-icons/bs'

const WebSock = ({userName}) => {
    const [messages, setMessages] = useState([]);
    // const [previousMessages,setPreviousMessages] = useState([])
    const [value, setValue] = useState('');
    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState(userName)
    const [showChat,setShowChat] = useState(false)
    const [showPreviousMessages,setShowPreviousMessages] = useState(false)
    console.log('messages in websocket',messages)
    // console.log('previousMessages',previousMessages)
    function connect() {
        socket.current = new WebSocket('ws://localhost:3001/echo')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
            // socket.current.send(message)
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            // const message = event.data
            console.log('event.data',event.data)
            setMessages(prev => [message, ...prev])
            // setPreviousMessages(prev => [message,...prev])

        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
            setConnected(false)
            const message = {
                event: 'close',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
            // socket.current.send(message)
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
        // socket.current.send(message);
        setValue('')
    }

  const showChatHandler = () => {
        setShowChat(!showChat)
        if(!connected){
            connect()
        }
    }

// const showPreviousMessages = ()=> {
//     messages ? messages?.filter(m => Array.isArray(m))[0]?.map(m=> m?
//         <div> <span className={userName == username ? styles.activeUser : styles.otherUsers}>{m.username}</span>: {m.message}</div>
//          : <>no messages</> ) :<>Loading</>
// }
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
                    {messages.map(m=> {
                        m.event === 'close' 
                        ? <div>Пользователь {m.username} вышел</div>
                        : <></>
                    })}
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div>
                                    <div className={styles.previosMessages}>Предыдущие сообщения</div>
                                     {/* <span className={userName == username ? styles.activeUser : styles.otherUsers}>{mess.username}</span>: {mess.message} */}
                                        {showPreviousMessages ? messages.filter(m => Array.isArray(m))[0]?.sort(function(a, b) {
                                            if(a.id < b.id){
                                                return 1
                                            }
                                            if(a.id > b.id){
                                                return - 1
                                            }
                                            return 0
                                            }).map(m=> m?
                                      <div> <span className={userName == username ? styles.activeUser : styles.otherUsers}>{m.username}</span>: {m.message}</div>
                                       : <>no messages</> ) :<>no messages</>}
                                    <button className={styles.loadPrevious} onClick={() => setShowPreviousMessages(!showPreviousMessages)}>Загрузить предыдущие сообщения</button>
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