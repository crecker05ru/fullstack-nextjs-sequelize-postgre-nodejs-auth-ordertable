import {BiUser} from "react-icons/bi"
import OrderList from './orderList';

const UserCard = ({user,orderList,currency,order,editOrderLimit,editOrderShippingCost}) => {
    return(
        <>
            <div>

                        <div className="card border-dark  mt-3 ms-auto me-auto users justify-content-between" ><BiUser/>{user.id} | {user.name}</div>
                        {console.log("u.id",user.id)}
                        {orderList.filter(o=> o.userId == user.id).map(o => 
                            <div key={o.id} >
                                {console.log("o.userId",o.userId)}
                               
                                <OrderList id={user.id} orderList={orderList.filter(o => o.userId == user.id)} order={order.filter(or => or.orderListId == o.id)} currency={currency} editOrderLimit={editOrderLimit} editOrderShippingCost={editOrderShippingCost}/>
                            </div>
                            )}
                        {/* <OrderList id={u.id} orderList={orderList.filter(o => o.userId == u.id)}/> */}
                        </div>

        </>
    )
}

export default UserCard