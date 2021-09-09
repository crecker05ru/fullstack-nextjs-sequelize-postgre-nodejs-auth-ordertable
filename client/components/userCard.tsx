import { useEffect } from 'react';
import { useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import OrderList from './orderList';
import AddOrder from './addOrder';

const UserCard: React.FC = () => {
    const {error,loading,users} = useTypedSelector(state => state.users)
    const {orderList} = useTypedSelector(state => state.orderList)
    const {order} = useTypedSelector(state => state.order)
    const [editCurrency,setEditCurrency] = useState(86)
    const {isAuth,user} = useTypedSelector(state => state.user)
    const {fetchUsers,fetchOrderList,fetchOrder,fetchCurrency} = useActions()
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
    if(error){
        return <h2>{error}</h2>
    }
    

    
    return (
        <>
            <div >
                {isAuth
                ? <AddOrder/> 
                : <h3>Войдите в учетную запись чтобы добавлять и просматривать заказы</h3> }
            
            <div>Курс &#8364; = {editCurrency} &#8381; </div>
             Изменить курс <input style={{ width: '2rem' }} value={editCurrency} onChange={e => setEditCurrency(Number(e.target.value) )}></input>
            <div className="usercard">
                {isAuth
                ? <>
                {users? users.map(u => <div key={u.id}>
                        <div className="card border-dark mb-3  users" style={{ width: '18rem' }}>{u.id} - {u.name}</div>
                        {console.log("u.id",u.id)}
                        {orderList.filter(o=> o.userId == u.id).map(o => 
                            <div key={o.id} >
                                {console.log("o.userId",o.userId)}
                               
                                <OrderList id={u.id} orderList={orderList.filter(o => o.userId == u.id)} order={order.filter(or => or.orderListId == o.id)} currency={editCurrency}/>
                            </div>
                            )}
                        {/* <OrderList id={u.id} orderList={orderList.filter(o => o.userId == u.id)}/> */}
                        </div>
                        ) : "Список пользователей пуст"}
                </>
                : <>
                
                </> 
                }
                    
                        </div>
            </div>
        </>
    )
}

export default UserCard