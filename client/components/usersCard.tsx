import { useEffect } from 'react';
import { useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import { useRouter } from 'next/router';
import OrderList from './orderList';
import AddOrder from './addOrder';
import UserCard from './userCard';
import Auth from '../pages/auth';
import { Button } from 'react-bootstrap';

const UsersCard: React.FC = () => {
    const router = useRouter()
    const {error,loading,users} = useTypedSelector(state => state.users)
    const {orderList} = useTypedSelector(state => state.orderList)
    const {order} = useTypedSelector(state => state.order)
    const [editCurrency,setEditCurrency] = useState(86)
    const [editOrderLimit,setEditOrderLimit] = useState(200)
    const [editOrderShippingCost,setEditOrderShippingCost] = useState(20)
    const {isAuth,user} = useTypedSelector(state => state.user)
    const {authData} = useTypedSelector(state => state.authData)
    const {fetchUsers,fetchOrderList,fetchOrder,fetchCurrency,logoutUser} = useActions()
    console.log('users',users)
    console.log('orderList in userCard',orderList)
    console.log("order in userCard",order)

    useEffect(() => {
        fetchUsers()
    },[])

    useEffect(()=> {
        fetchOrderList()
       },[])

    useEffect(() => {
        fetchOrder()
    },[])

    const logOut = async () => {
        logoutUser()
        router.push('/auth')
    }

    // if(authData.role == "USER"){
    //     return (
    //         <>
    //         <h1>Role USER</h1>
    //         <button className="btn btn-warning" onClick={logOut}>Log out</button> 
    //         <AddOrder/> 
    //         <UserCard user={authData}  orderList={orderList} currency={editCurrency} order={order}/>
    //         </>
    //     )
    // }

    // useEffect(()=>{
    //     fetchUser()
    // },[users])
    
    // useEffect( () => {
    //     async function load () {
    //         try{
    //         const response  = await fetch("http://localhost:3001/api/userprofile")
    //         const json = await response.json()
    //         setUsers(json)
    //     }catch(e){
    //         console.log(e)
    //     }
    // }load()
    // },[])
    
    if(loading){
        return <h2>Loading</h2>
    }
    // if(error){
    //     return <h2>{error}</h2>
    // }
    

    
    return (
        <>
            <div >
           
                {/* {isAuth
                ? <div>
                    
                    <AddOrder/> 
                    <button className="btn btn-warning" onClick={logOut}>Log out</button> 
                    </div>
                : <div><h3>Войдите в учетную запись чтобы добавлять и просматривать заказы</h3> 
                    // <Auth/> 
                    <button className="btn btn-info" onClick={() => router.push('/auth')}>Авторизоваться</button>
                </div>} */}
            
             <><div>
                 <div>
                 <div>Курс &#8364; = {editCurrency} &#8381; </div>
             Изменить курс <input className="form-control" style={{ width: '4rem' }} value={editCurrency} onChange={e => setEditCurrency(Number(e.target.value) )}></input>
             <span>Сумма корзины в &#8364;</span><input className="form-control" style={{ width: '4rem' }} value={editOrderLimit} onChange={e => setEditOrderLimit(Number(e.target.value) )}></input>
             <span>Стоимость доставки на сайте в &#8364;</span><input className="form-control" style={{ width: '4rem' }} value={editOrderShippingCost} onChange={e => setEditOrderShippingCost(Number(e.target.value) )}></input>
                 </div>
                    <AddOrder/> 
                    <div className="d-flex">
                    <button className="btn ms-2 mt-2 btn-warning  col-3  ms-auto me-auto" onClick={logOut}>Log out</button> 
                    </div>
                    
                    </div>
           
             </> 
             

            <div className="ms-2">
                
                {users
                ? 
                 users.map(u => <div key={u.id}>
                     <UserCard user={u}  orderList={orderList} currency={editCurrency} order={order} editOrderLimit={editOrderLimit} editOrderShippingCost={editOrderShippingCost}/>   
                     </div>

                //         <div className="card border-dark mb-3  users" style={{ width: '18rem' }}>{u.id} - {u.name}</div>
                //         {console.log("u.id",u.id)}
                //         {orderList.filter(o=> o.userId == u.id).map(o => 
                //             <div key={o.id} >
                //                 {console.log("o.userId",o.userId)}
                               
                //                 <OrderList id={u.id} orderList={orderList.filter(o => o.userId == u.id)} order={order.filter(or => or.orderListId == o.id)} currency={editCurrency}/>
                //             </div>
                //             )}
                //         {/* <OrderList id={u.id} orderList={orderList.filter(o => o.userId == u.id)}/> */}
                //         </div>
                        ) 
                        : "Список пользователей пуст"}
              
                
                
                    
                        </div>
            </div>
        </>
    )
}

export default UsersCard