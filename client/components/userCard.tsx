import { useEffect } from 'react';
import { useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import OrderList from './orderList';
import AddOrder from './addOrder';
const UserCard: React.FC = () => {
    const {error,loading,users} = useTypedSelector(state => state.users)
    const {fetchUsers} = useActions()
    console.log('users',users)

    useEffect(() => {
        fetchUsers()
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
            <AddOrder/>
            <div className="usercard">
                    {users? users.map(u => <div key={u.id}>
                        <div className="users">{u.id} - {u.name}</div>
                        <OrderList id={u.id}/>
                        </div>
                        ) : "Список пользователей пуст"}
                        </div>
            </div>
        </>
    )
}

export default UserCard