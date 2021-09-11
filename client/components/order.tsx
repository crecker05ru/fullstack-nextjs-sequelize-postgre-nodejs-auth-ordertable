import EditOrder from './editOrder';
import { useState } from 'react';

export default function Order  ({id,position,name,option,link,price,count,total,index,deleteOrd,currency}) {

    const [edit,setEdit] = useState(false)

    const clickHandler = () => {
        setEdit(!edit)
    }

    return (
        <>
                            {edit 
                    ? <div>
                        <EditOrder id={id} position={position} name={name} option={option} link={link} price={price} count={count} total={total} clickHandler={clickHandler}/>
                        </div>
                    
                    :           <div className="list-group-item d-flex justify-content-between">Номер - {index+1} Наименование - {name} | Опция - {option} | Ссылка - <a href={link} target="_blank">{link}</a>  | Цена -  {price} &#8364;| Количество - {count} | Итого в &#8364; - {total}  Итого в &#8381; - {total*currency}<div>
                    <button className="btn btn-primary ms-2 text-center" onClick={clickHandler}>Изменить</button>
                        <button className="btn btn-danger ms-2 text-center" onClick={() => deleteOrd(id)}>X</button></div></div>
                }

        </>
    )
}