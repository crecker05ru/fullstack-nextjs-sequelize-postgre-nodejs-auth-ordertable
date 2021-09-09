import { useState ,useEffect} from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';


export default function EditOrder ({id,position,name,option,link,price,count,total,clickHandler}) {
    const [editPosition,setEditPosition] = useState(position)
    const [editName, setEditName] = useState(name)
    const [editOption,setEditOption] = useState(option)
    const [editLink,setEditLink] = useState(link)
    const [editPrice, setEditPrice] = useState(price)
    const [editCount, setEditCount] = useState(count)
    let [editTotal,setEditTotal] = useState(total)
    const {editOrder} = useActions()
    const {order} = useTypedSelector(state=>state.order)


    const editHandler =(id,position,name,option,link,price,count,total) => {
        
        editOrder(id,position,name,link,option,price,count,total)
        clickHandler()
        console.log(id,position,name,link,price,count,total)
        console.log("order",order)
        // console.log(editOrder())
        
    }
    
    return (
        <>
        <div>
        <label >Добавить заказ </label>
            <input placeholder="Название" value={editName} onChange={e => setEditName(e.target.value)}></input>
            <input placeholder="Опция" value={editOption} onChange={e => setEditOption(e.target.value)}></input>
            <input placeholder="Ссылка" value={editLink} onChange={ e => setEditLink(e.target.value)}></input>
            Цена в &#8364; <input placeholder="Цена"  value={editPrice} onChange={e => setEditPrice(Number(e.target.value))}></input>
            Количество  <input placeholder="Количество"  value={editCount} onChange={e => setEditCount(Number(e.target.value))}></input>
            <label placeholder="Total" >Итого &#8364;: {editTotal=editCount*editPrice} </label>
            {/* <label>ИД {id}</label> */}
            <button onClick={()=> editHandler(id,editPosition,editName,editOption,editLink,editPrice,editCount,editTotal)} className="btn btn-success">&#10003;</button>
        </div>
        </>
    )
}