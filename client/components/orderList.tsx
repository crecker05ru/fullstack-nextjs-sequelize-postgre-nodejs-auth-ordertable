import axios from 'axios';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import {order} from "../interfaces/order"
import {user} from "../interfaces/user"
import { useEffect, useState } from "react"
import Order from './order';
import {useDispatch,useSelector} from "react-redux";
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import AddOrder from './addOrder';



export default function OrderList ({id}){
    const {orderList,error,loading} = useTypedSelector(state => state.orderList)
    const [users,setUsers] = useState([])
    const [orders,setOrders] = useState([])
    const {fetchOrderList,fetchOrderListById} = useActions()

    console.log('order',orderList)
    
    useEffect(()=> {
     fetchOrderListById(id)
    },[])
    
//      async  function loadUsers () {
//         const response =  await fetch("https://jsonplaceholder.typicode.com/users")
//         const json = await response.json()
//         setUsers(json)
//  }
    // useEffect( () => {
        
    //     async function load() {

    //         try{
            
    //             const response =  await fetch(`http://localhost:3001/api/order/`)
    //             const json = await response.json()
    //             setOrders(json)
    //         }
    //         catch(e){
    //             console.log(e)
    //         }
    //     }
        
    //     load()
    // },[])
    if(loading){
        return <h2>Loading</h2>
    }
    if(!orderList){
        return <h3>Нет списка</h3>
    }
    return (
    <div>
       Лист Пользователя {id}   
        ИД Листа {orderList.id}
            
    
    <Order id={id}/>
    
    <label>ИД {id}</label>
    </div>
    )
}

// export const getServerSideProps: GetServerSideProps = async (context) =>  {
//     const response =  await fetch(`http://localhost:3001/api/order`)
//     console.log('response',response)
//     const orders = await response.json()
//     console.log('orders',orders)
//     return {
//         props: {orders}
//     }
// }

// export async function getServerSideProps () {
//     const response =  await fetch("https://jsonplaceholder.typicode.com/users")
//     const orders = await response.json()
//     return {
//         props: {orders}
//     }
// }
// export async function getServerSideProps () {
//     const response =  await fetch("https://jsonplaceholder.typicode.com/users")
//     const users = await response.json()
//     return {
//         props: {users}
//     }
// }
