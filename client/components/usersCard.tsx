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
    const {isAuth,user} = useTypedSelector(state => state.user)
    const {error,loading,users} = useTypedSelector(state => state.users)
    const {orderList} = useTypedSelector(state => state.orderList)
    const {order} = useTypedSelector(state => state.order)
    const [editCurrency,setEditCurrency] = useState(86)
    const [editOrderLimit,setEditOrderLimit] = useState(200)
    const [editOrderShippingCost,setEditOrderShippingCost] = useState(20)
   
    const {authData} = useTypedSelector(state => state.authData)
    const {fetchUsers,fetchOrderList,fetchOrder,fetchCurrency,logoutUser,fetchUser} = useActions()
    // console.log('users',users)
    // console.log('orderList in userCard',orderList)
    // console.log("order in userCard",order)

    useEffect(() => {

            fetchUser()

        
    },[])
    
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
                : <div><h3>?????????????? ?? ?????????????? ???????????? ?????????? ?????????????????? ?? ?????????????????????????? ????????????</h3> 
                    // <Auth/> 
                    <button className="btn btn-info" onClick={() => router.push('/auth')}>????????????????????????????</button>
                </div>} */}
            
             <><div>
                 <div className="d-flex ms-2 align-content-center flex-wrap">
                 <div>???????? &#8364; = {editCurrency} &#8381; </div>
             ???????????????? ???????? <input className="border-radius-5px border-2 ms-1 me-3" style={{ width: '4rem' }} value={editCurrency} onChange={e => setEditCurrency(Number(e.target.value) )}></input>
             <span>?????????? ?????????????? ?? &#8364;</span><input className="border-radius-5px border-2 ms-1 me-3" style={{ width: '4rem' }} value={editOrderLimit} onChange={e => setEditOrderLimit(Number(e.target.value) )}></input>
             <span>?????????????????? ???????????????? ???? ?????????? ?? &#8364;</span><input className="border-radius-5px border-2 ms-1 me-3" style={{ width: '4rem' }} value={editOrderShippingCost} onChange={e => setEditOrderShippingCost(Number(e.target.value) )}></input>
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
                        : "???????????? ?????????????????????????? ????????"}
              
                
                
                    
                        </div>
            </div>
        </>
    )
}

export default UsersCard