import { useState ,useEffect} from 'react';
import { useActions } from './hooks/useActions';


export default function EditOrder ({id,position,name,link,price,count,total,clickHandler}) {
    const [editPosition,setEditPosition] = useState(position)
    const [editName, setEditName] = useState(name)
    const [editLink,setEditLink] = useState(link)
    const [editPrice, setEditPrice] = useState(price)
    const [editCount, setEditCount] = useState(count)
    let [editTotal,setEditTotal] = useState(total)
    const {editOrder} = useActions()


    const editHandler =(id,position,name,link,price,count,total) => {
        clickHandler()
        editOrder(id,position,name,link,price,count,total)
        
    }
    
    return (
        <>
        <div>
        <label >Добавить заказ </label>
            <input placeholder="Название/опция" value={editName} onChange={e => setEditName(e.target.value)}></input>
            <input placeholder="Ссылка" value={editLink} onChange={ e => setEditLink(e.target.value)}></input>
            Цена в &#8364; <input placeholder="Цена"  value={editPrice} onChange={e => setEditPrice(Number(e.target.value))}></input>
            Количество  <input placeholder="Количество"  value={editCount} onChange={e => setEditCount(Number(e.target.value))}></input>
            <label placeholder="Total" >Итого &#8364;: {editTotal=editCount*editPrice} </label>
            {/* <label>ИД {id}</label> */}
            <button onClick={()=> editHandler(id,editPosition,editName,editLink,editPrice,editCount,editTotal)} className="btn btn-success">&#10003;</button>
        </div>
        </>
    )
}