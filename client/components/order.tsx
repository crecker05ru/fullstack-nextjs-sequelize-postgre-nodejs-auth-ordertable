import EditOrder from './editOrder';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

export default function Order  ({id,position,name,option,link,price,count,total,index,deleteOrd,currency,editOrderLimit,userId,currentUserId }) {

    const [edit,setEdit] = useState(false)

    const clickHandler = () => {
        setEdit(!edit)
    }

    return (
        <>
                            {edit 
                    ? <div>
                        <EditOrder id={id} position={position} name={name} option={option} link={link} price={price} count={count} total={total} index={index} currency={currency} clickHandler={clickHandler}/>
                        </div>
                    
                    : <>
                            <div className="list-group-item  justify-content-between">
                                {/* Номер - {index+1} Наименование - {name} | Опция - {option} | Ссылка - <a href={link} target="_blank">{link}</a>  | Цена -  {price} &#8364;| Количество - {count} | Итого в &#8364; - {total}  Итого в &#8381; - {(total*currency).toFixed(2)} */}
                                
                            <Table  size="sm" responsive>
                                <thead>
                                    <tr>
                                        <th>Номер</th>
                                        <th>Наименование</th>
                                        <th >Опция</th>
                                        <th  >Ссылка</th>
                                        <th>Цена &#8364;</th>
                                        <th>Количество</th>
                                        <th>Итого в &#8364;</th>
                                        <th>Итого в &#8381;</th>
                                        
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{name}</td>
                                        <td>{option}</td>
                                        <td><a  href={link} target="_blank">{link}</a></td>
                                        <td>{price}</td>
                                        <td>{count}</td>
                                        <td>{total}</td>
                                        <td>{(total*currency).toFixed(2)}</td>
                                        <td>{userId == currentUserId ? <>
                                        <button className="btn btn-primary ms-2 text-center" onClick={clickHandler}>Изменить</button>
                                    <button className="btn btn-danger ms-2 text-center" onClick={() => deleteOrd(id)}>X</button>
                                    </> 
                                        : <> </>}</td>
                                    </tr>
                                </tbody>

                            </Table>
                                </div>
                        </>       
                    
                }

        </>
    )
}