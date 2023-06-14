import OrderTable from "./OrderTable";
import {useEffect, useState} from "react";
import api from "../api/categories";


const WorkPanel = ({page, bearer, changePage}) => {

    const [orders, setOrders] = useState()
    const [refresh, setRefresh] = useState(false)

    useEffect( () => {

        setOrders([])
        if (page === 2) {
            console.log("page 2")
            fetchOrdersCustom('http://127.0.0.1:8000/api/orders?finished[eq]=0')
        } else if (page === 3) {
            console.log("page 3")
            fetchOrdersCustom('http://127.0.0.1:8000/api/orders?finished[eq]=1')
        }
    }, [page, refresh])

    const fetchOrdersCustom = async (url) => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${bearer}`
            },
            data: ''
        }

        try{
            const response = await api.request(config)
            console.log(response.data)
            setOrders(response.data)
        } catch (err) {
            if (err.response) {
                //not in 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error ${err.message}`)
            }
        }
    }

    const refreshPage = () => {
        setRefresh(!refresh)
    }


    return (
        <div style={{minHeight: "80vh"}}>
            {page === 1 &&
                <div>
                    Podsumowanie
                </div>
            }
            {page === 2 &&
                <div className='m-3'>
                    <OrderTable orders={orders} updateOrdersCustom={fetchOrdersCustom} bearer={bearer} changePage={changePage} page={page} refresh={refreshPage}/>
                </div>
            }
            {page === 3 &&
                <div>
                    <OrderTable orders={orders} updateOrdersCustom={fetchOrdersCustom} bearer={bearer}/>
                </div>
            }
        </div>
    )
}

export default WorkPanel