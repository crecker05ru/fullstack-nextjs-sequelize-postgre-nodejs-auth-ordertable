import axios from 'axios';
import { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

export default function Order ({id}) {

    const {order,error,loading} = useTypedSelector(state => state.order)
    const {fetchOrder} = useActions()

    // useEffect(() => {
    //     fetchOrder()
    // },[id])

    // const increment = () => {
    //     setPosition(position + 1)
    // }

    // const addOrder = () => {
    //     axios.post("http://localhost:3001/api/order",{position,name: itemName,price,link,total,orderListId: id})
    // }
    
    // useEffect( () => {
    //     dispatch(getOrder())
    // },[])
    if(loading){
        return <h2>Loading</h2>
    }
    if(!order){
        return <h2>Нет заказов</h2>
    }
    return(
        <>
        <div>
            {order.length > 0 ? order.map( o => 
                <div>
                    <li>{o.name}</li>
                </div>
            ) : "Нет заказов" }
        </div>
        </>
    )
}