import OrderTable from "./OrderTable";
import {useEffect} from "react";


const WorkPanel = ({page, orders, updateOrders, updateOrdersCustom, bearer}) => {
    useEffect(() => {
        if (!orders) updateOrders()
    }, [])

    return (
        <div>
            {page === 1 &&
                <div>
                    Podsumowanie
                </div>
            }
            {page === 2 &&
                <div className='m-3'>
                    <OrderTable orders={orders} updateOrdersCustom={updateOrdersCustom} bearer={bearer}/>
                </div>
            }
            {page === 3 &&
                <div>
                    <OrderTable orders={orders} updateOrdersCustom={updateOrdersCustom} />
                </div>
            }
        </div>
    )
}

export default WorkPanel