import axios from 'axios';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useEffect, useState } from "react"
import Orders from './orders';
import {useDispatch,useSelector} from "react-redux";
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import AddOrder from './addOrder';
import { useRouter } from 'next/router'


export default function OrderList ({id,orderList,order,currency,editOrderLimit,editOrderShippingCost}){
    // const [users,setUsers] = useState([])
    // const [orders,setOrders] = useState([])
    // const {fetchOrderList,fetchOrderListById,fetchOrderById} = useActions()
    const router = useRouter()
    const {authData} = useTypedSelector(state => state.authData)
    const currentUserId = authData.id
    const list = orderList[orderList.length - 1]
    const listId = list.id
    let [editTotal,setEditTotal] = useState(list.total)
    let [editPayedTotal,setEditPayedTotal] = useState(list.payedTotal)
    let [shipping,setShipping] = useState(list.shipping)
    let [totalWithShipping,setTotalWithShipping] = useState(list.totalWithShipping)
    const [editPayed,setEditPayed] = useState(false)
    let [difference,setDifference] = useState(list.difference)
    const {editOrderList,newOrderList} = useActions()
    let [totalInRub,setTotalInRub] = useState(Number(currency*order.reduce((prev,current)=> {return prev + current.total},0).toFixed(2)))
 
    editTotal = order.reduce((prev,current)=> {return prev + current.total},0)
    editTotal.toFixed(2)
    shipping = (editTotal/editOrderLimit*editOrderShippingCost)
    Number(shipping).toFixed(2)
    totalWithShipping = (editTotal + shipping).toFixed(2)
    difference =  editPayedTotal - totalInRub
    totalInRub = (editTotal * currency).toFixed(2)
    

    console.log('orderList',orderList)
    // console.log('orders',orders)
    console.log('orderList.idt',list.id)
    console.log('orderList[0]',orderList[0])
    console.log("list",list)
    console.log("order in orderList",order)
    console.log('listId,editTotal,editPayedTotal',listId,editTotal,editPayedTotal)
    // id,total,shipping,totalWithShipping,payedTotal,difference
    const handlTotalPayed = () => {
        setEditPayed(!editPayed)
    }

    const updateOrderList = () => {
        setEditPayed(!editPayed)
        editOrderList(listId,editTotal,shipping,totalWithShipping,editPayedTotal,difference)
        router.reload()
    }
    const newOrderListHandler = () => {
        newOrderList(list.userId)
    }

    
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
    if(orderList.loading){
        return <h2>Loading</h2>
    }
    if(!orderList){
        return <h3>Нет списка</h3>
    }
    return (
    <div >
        <div className="d-flex flex-wrap me-4 border border-warning mt-1">
        <div className="ms-auto me-auto mt-auto">| Итого корзины = {editTotal.toFixed(2)} &#8364; </div>
        <div className="ms-auto me-auto mt-auto">| Итого в &#8381; =   {totalInRub}</div>
        <div className="ms-auto me-auto mt-auto">| Доставка в &#8364; - {shipping.toFixed(2)}</div>
        <div className="ms-auto me-auto mt-auto">| Итого + доставка в &#8364; - {totalWithShipping}</div>
       {editPayed 
       ? <input className="border-radius-5px border-2 form-control-sm" value={editPayedTotal} type="number" onChange={e => setEditPayedTotal(e.target.value)}></input>
       : <div className="ms-auto me-auto mt-auto">| Оплачено в &#8381;  - {editPayedTotal}</div> }
       <div className="ms-auto me-auto mt-auto">| Разница в &#8381; - {difference.toFixed(2)}</div>
      <div className="mt-1">
        {id == currentUserId 
        ?<>
         <button className="btn btn-primary" onClick={newOrderListHandler}>Новый список</button>
        {editPayed 
        ? <>
        <button className="btn btn-warning" onClick={updateOrderList}>Обновить</button> 
        
        </>
        : <button className="btn btn-success " onClick={handlTotalPayed}>Изменить</button> 
        } </>
        : <></>
            }
         </div>
         </div>
        <div>
            <Orders listId={list.id} userId={list.userId} order={order.filter(o => o.orderListId == list.id)} currency={currency} editOrderLimit={editOrderLimit} currentUserId ={currentUserId }/> 
        </div>

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
