import axios from 'axios';
import { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import AddOrder from './addOrder';

export default function Order ({listId,order,currency}) {
 
    const [edit,setEdit] = useState(false)
    const {deleteOrder,editOrder} = useActions()
    console.log("order",order)

    const deleteOrd = (id) => {
        deleteOrder(id)
    }
    const clickHandler = () => {
        setEdit(!edit)
    }
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
                    {edit 
                    ? <div>
                        <AddOrder />
                        <button onClick={clickHandler} className="btn btn-success">&#10003;</button>
                        </div>
                    
                    : <div className="list-group-item d-flex justify-content-between">Номер {index+1} - Наименование {o.name} | Ссылка {o.link} | Цена {o.price} | Количество {o.count} | Итого в &#8364; {o.total}  Итого в &#8381; {o.total*currency}<div>
                    <button className="btn btn-primary ms-2 text-center" onClick={clickHandler}>Изменить</button>
                        <button className="btn btn-danger ms-2 text-center" onClick={() => deleteOrd(o.id)}>X</button></div></div>
                }
                    
                    
                </div>
            ) : "Нет заказов" }
        </div>
        </>
    )
}