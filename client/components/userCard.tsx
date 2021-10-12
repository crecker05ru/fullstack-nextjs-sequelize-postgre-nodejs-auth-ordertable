import {BiUser} from "react-icons/bi"
import OrderList from './orderList';
import WebSock from './webSock';

const UserCard = ({user,orderList,currency,order,editOrderLimit,editOrderShippingCost}) => {
    return(
        <>
            <div>

                        <div className="card border-dark  mt-3 ms-auto me-auto users justify-content-between" ><BiUser/>{user.id}  | {user.userId}| {user.name}</div>
                        <WebSock userName={user.name}/>
                        {console.log("u.id",user.id,user.userId)}
                        {orderList.filter(o=> o.userId == user.userId).map(o => 
                            <div key={o.id} >
                                {console.log("o.userId",o.userId)}
                               
                                <OrderList id={user.userId} orderList={orderList.filter(o => o.userId == user.userId)} order={order.filter(or => or.orderListId == o.id)} currency={currency} editOrderLimit={editOrderLimit} editOrderShippingCost={editOrderShippingCost}/>
                            </div>
                            )}
                        {/* <OrderList id={u.id} orderList={orderList.filter(o => o.userId == u.id)}/> */}
                        </div>

        </>
    )
}

export default UserCard