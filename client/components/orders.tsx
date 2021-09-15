import axios from 'axios';
import { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import AddOrder from './addOrder';
import Order from './order'
import EditOrder from './editOrder';

export default function Orders ({listId,order,currency,currentUserId,userId}) {
    
    const [edit,setEdit] = useState(false)
    const {deleteOrder,editOrder} = useActions()
    console.log("order",order)

    const deleteOrd = (id) => {
        deleteOrder(id)
    }
    // const clickHandler = () => {
    //     setEdit(!edit)
    // }

    // const editOrd =(id,position,name,link,price,count,total) => {
    //     editOrder(id,position,name,link,price,count,total)
    // }
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
    // if(loading){
    //     return <h2>Loading</h2>
    // }
    // if(!order){
    //     return <h2>Нет заказов</h2>
    // }
    return(
        <>
        <div>
            {order.length > 0 ? order.map( (o,index) => 
                <div className="card " style={{ width: '70rem' }}  key={o.id}>
                    <Order id={o.id} position={o.position} name={o.name} option={o.option} link={o.link} price={o.price} count={o.count} total={o.total} index={index} currency={currency} deleteOrd={deleteOrd} userId={userId}  currentUserId={currentUserId}/>
                
                    
                    
                </div>
            ) : "Нет заказов" }
        </div>
        </>
    )
}