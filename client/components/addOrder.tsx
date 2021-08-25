import { useState ,useEffect} from 'react';
import { useActions } from './hooks/useActions';

export default function AddOrder () {
    const [position,setPosition] = useState(1)
    const [itemName, setItemName] = useState('')
    const [link,setLink] = useState('')
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(0)
    const [total,setTotal] = useState(0)
    const {addOrder} = useActions()
    let orderListId = 1
    const add = () => {
        addOrder(position,name,price,link,total,orderListId)
    }
    
    return (
        <>
        <div>
        <label >Позиция {position}</label>
            <input placeholder="Название/опция" value={itemName} onChange={e => setItemName(e.target.value)}></input>
            <input placeholder="Ссылка" value={link} onChange={ e => setLink(e.target.value)}></input>
            <input placeholder="Price" type={"number"} value={price} onChange={e => setPrice(Number(e.target.value))}></input>
            <input placeholder="Count" type={"number"} value={count} onChange={e => setCount(Number(e.target.value))}></input>
            <label placeholder="Total" >Итого: {total} </label>
            {/* <label>ИД {id}</label> */}
            <button onClick={add}>Add</button>
        </div>
        </>
    )
}