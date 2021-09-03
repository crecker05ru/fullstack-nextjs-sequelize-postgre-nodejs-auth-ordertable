import { useState ,useEffect} from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

export default function AddOrder () {
    const [position,setPosition] = useState(1)
    const [name, setName] = useState('')
    const [link,setLink] = useState('')
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(1)
    let [total,setTotal] = useState(0)
    const {authData} = useTypedSelector(state => state.authData)
    console.log('authData',authData)
    
    const {addOrder} = useActions()
    let orderListId = authData.id
    console.log("authData.id",authData.id)
    const add = () => {
        addOrder(position,name,link,price,count,total,orderListId)
    }
    
    return (
        <>
        <div>
        <label >Добавить заказ </label>
            <input placeholder="Название/опция" value={name} onChange={e => setName(e.target.value)}></input>
            <input placeholder="Ссылка" value={link} onChange={ e => setLink(e.target.value)}></input>
            Цена в &#8364; <input placeholder="Цена"  value={price} onChange={e => setPrice(Number(e.target.value))}></input>
            Количество  <input placeholder="Количество"  value={count} onChange={e => setCount(Number(e.target.value))}></input>
            <label placeholder="Total" >Итого &#8364;: {total=count*price} </label>
            {/* <label>ИД {id}</label> */}
            <button className="btn btn-info ms-2" onClick={add}>Add</button>
        </div>
        </>
    )
}