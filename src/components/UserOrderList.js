import api from "../api/categories";
import {useEffect, useState} from "react";
import Order from "./Order";

const UserOrderList = ({bearer, authUser}) => {
    const [orders, setOrders] = useState([])
    const [orderUsers, setOrderUsers] = useState([])
    const [single, setSingle] = useState()
    const [ids, setIds] = useState([])
    const [id, setId] = useState(-1)
    const [page, setPage] = useState(0)
    const [choosen, setChoosen] = useState({})

    // fetch all orderToUsers records for logged user
    useEffect(() => {
        fetchCustom(`http://127.0.0.1:8000/api/orderToUsers?userId[eq]=${authUser.id}`, setOrderUsers)
    }, [])

    // fetch orderIds from orderUser table and put to ids table; put ids table length into id
    useEffect(() => {
        let table = []
        orderUsers.forEach((e) => {
            if(!table.find((el) => el === e.orderId)) table.push(e.orderId)
        })
        console.log(table)
        setIds(table)
        setId(table.length -1 )
    }, [orderUsers])

   // fetch single order record to single
    useEffect(() => {
        if (id > -1) {
            console.log("fetch Single")
            fetchCustom(`http://127.0.0.1:8000/api/orders?id[eq]=${ids[id]}`, setSingle)
        }
    },[id])

    // push value from single to orders and decrement id
    useEffect(() => {
        console.log("put single")
        if (single) {
            setOrders([...orders, single[0]])
            setId(id - 1)
        }

        console.log(orders)
    }, [single])


    const fetchCustom = async (url, target) => {
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
            console.log(response.data.data)
            target(response.data.data)
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

    const backToList = () => {
        setPage(0)
    }
    const viewOrder = (single) => {
        setChoosen(single)
        setPage(1)
    }

    const tableView = () => {
        return <table className='table table-hover table-responsive table-sm'>
            <thead>
            <tr>
                <th scope='col'>Id</th>
                <th scope='col'>data Dodadania</th>
                <th scope='col'>data zakońćzenia</th>
                <th scope='col'>czy dostawa</th>
                <th scope='col' className='d-md-table-cell d-none'>adres dostawy</th>
                <th scope='col'>czy faktura</th>
            </tr>
            </thead>
            <tbody>
            {
                orders.map((single) =>
                    <tr key={single.id} onClick={() => viewOrder(single)}>
                        <th scope={'row'}>{single.id}</th>
                        <td>{single.postDate}</td>
                        <td>{single.sendDate}</td>
                        <td>{single.deliver === 1 ? 'tak' : 'nie'}</td>
                        <td className='d-md-table-cell d-none'>{single.deliverAddress}</td>
                        <td>{single.invoice === 1 ? 'tak' : 'nie'}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    }

    return <div>
        {
            page === 0 ? tableView() :
                <Order order={choosen} bearer={bearer} onReturn={backToList} authUser={authUser} />
        }
    </div>
}
export default UserOrderList