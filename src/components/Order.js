import {useEffect, useState} from "react";
import api from "../api/categories";

const Order = ({order, bearer, onReturn, changePage, page, authUser}) => {
    const [client, setClient] = useState()
    const [ids, setIds] = useState([])
    const [id, setId] = useState(-1)
    const [pIds, setPIds] = useState([])
    const [pId, setPId] = useState(-1)
    const [singleProduct, setSingleProduct] = useState(null)
    const [singleUser, setSingleUser] = useState(null)
    const [userCollection, setUserCollection] = useState([])
    const [productCollection, setProductCollection] = useState([])
    const [orderUsers, setOrderUsers] = useState([])
    const [orderProducts, setOrderProducts] = useState([])
    const [actionSelect, setActionSelect] = useState("")
    const [actionTranslate, setActionTranslate] = useState({
        "A": "Akceptacja zamówienia",
        "C": "Złożenie zamówienia",
        "P": "przygotowanie zamówienia",
        "Z": "anulowanie zamówienia",
        "S": "wysłanie zamówienia",
        "X": "Prośba o anulowanie zamówienia"
})

    //load data on render
    useEffect(() => {
        if (order.id) {
            fetchOrderUsers(`http://127.0.0.1:8000/api/orderToUsers?orderId[eq]=${order.id}`)
            fetchOrderProducts(`http://127.0.0.1:8000/api/orderToProducts?orderId[eq]=${order.id}`)
        }
    },[])

    // gather user's ids after orderUsers change and call fetchUserCollection
    useEffect( () => {
        if (orderUsers.length > 0) {
            let table = []
            for (const user in orderUsers) {
                if (!table.find(e => e === orderUsers[user].userId)) table.push(orderUsers[user].userId)
            }
            fetchUsersCollection(table)
    }
    },[orderUsers])

    // looking for client in users Collection on userCollection change // add id verification
    useEffect( () => {

        if (userCollection.length > 0) {
            let tempId = orderUsers.filter((e) => e.role.toUpperCase() === 'C')
            let tempClient = userCollection.filter((e) => e.id === tempId.userId)[0]
            setClient(tempClient)
        }
    }, [userCollection])

    // gather product's ids after orderProducts change and call fetchProductsCollection
    useEffect( () => {
            if (orderProducts.length > 0) {

            let table = []
            for (const i in orderProducts) {
                table.push(orderProducts[i].productId)
            }
            fetchProductsCollection(table)
        }
    },[orderProducts])

    // put singleUser into userCollection after every userCollection change and increment id
    useEffect( () => {
        if (singleUser !== null) {
            setUserCollection([...userCollection, singleUser])
            setId(id + 1)
        }
    }, [singleUser])

    // fetching user by id after id change and put into singleUser
    useEffect(() => {
        if(id !== -1)
            if (ids.length <= id) {
                setId(-1)
            } else {

                    fetchCustom(`http://127.0.0.1:8000/api/users?id[eq]=${ids[id]}`, setSingleUser)
            }
    }, [id])

    // put singleUser into productCollection after every productCollection change and increment pId
    useEffect( () => {
        if (singleProduct !== null) {
            setProductCollection([...productCollection, singleProduct[0]])
            setPId(pId + 1)
        }
    }, [singleProduct])

    // fetchin product by id after pId change and put into  single Product
    useEffect(() => {
        if(pId !== -1)
            if (pIds.length <= pId) {
                setPId(-1)
            } else {
                fetchCustom(`http://127.0.0.1:8000/api/products?id[eq]=${pIds[pId]}`, setSingleProduct)
            }
    }, [pId])

    // fetch data from API by url and pu it into useState set function
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
            console.log(response.data)
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

    const sendAction = async () => {

        let data = {
            "userId": authUser.id,
            "orderId": order.id,
            "role": actionSelect,
        }
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/orderToUsers',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearer}`
            },
            data : JSON.stringify(data)
        };

        try{
            const response = await api.request(config)
            console.log(response.data)
            onReturn(0)

        } catch (err) {
            if (err.response) {
                //not in 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error ${err.message}`)
            }
            alert("błąd przy wysyłaniu akcji")
        }

    }

    const finsihOrder = async () => {
        let currentdate = new Date();
        let datetime = "" + currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        const data = {finished: true, postDate: datetime}

        const config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/orders/${order.id}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearer}`
            },
            data: JSON.stringify(data)
        }

        try{
            const response = await api.request(config)
            console.log(response.data)
            onReturn(0)
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


    const fetchOrderUsers = (url) => {
        fetchCustom(url, setOrderUsers)
    }

    const fetchOrderProducts = (url) => {
        fetchCustom(url, setOrderProducts)
    }

    const fetchUsersCollection = (idsList) => {
        setIds(idsList)
        setId(0)
    }
    const fetchProductsCollection = (idsList) => {
        setPIds(idsList)
        setPId(0)
    }

    const userTable = () => {
        return <table className='table'>
            <thead>
            <tr>
                <th scope='col'> imie i nazwisko</th>
                <th scope='col'>{client[0].firstName} {client[0].lastName}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>email</td>
                <td>{client[0].email}</td>
            </tr>
            <tr>
                <td>adres kor.</td>
                <td>{client[0].mailingAddress}</td>
            </tr>
            <tr>
                <td>dostawa</td>
                <td>{order.deliver === 1 ? "Tak" : "Nie"}</td>
            </tr>
            {order.deliver === 1 &&
                <tr>
                    <td>adres Dostawy</td>
                    <td>{order.deliverAddress}</td>
                </tr>
            }
            <tr>
                <td>faktura</td>
                <td>{order.invoice === 1 ? "Tak" : "Nie"}</td>
            </tr>

            {client[0].nip &&
                <tr>
                    <td>nip</td>
                    <td>{client[0].nip}</td>
                </tr>
            }
            {client[0].companyName &&
                <tr>
                    <td>Nazwa firmy</td>
                    <td>{client[0].companyName}</td>
                </tr>
            }
            {client[0].companyAddress &&
                <tr>
                    <td>Adres firmy</td>
                    <td>{client[0].companyAddress}</td>
                </tr>
            }
            {client[0].companyMailingAddress &&
                <tr>
                    <td>Adres kor. firmy</td>
                    <td>{client[0].companyMailingAddress}</td>
                </tr>
            }

            </tbody>
        </table>
    }

    const workersTable = () => {
        return <table className='table'>
            <thead>
            <tr>
                <th scope='col'> imie i nazwisko</th>
                <th scope='col'> email</th>
                <th scope='col'> akcja</th>
            </tr>
            </thead>
            <tbody>

                {orderUsers.map((order) => {
                    return userCollection.filter((e) => e[0].id === order.userId)[0].map((usr) => {
                        return <tr>
                        <td>{usr.firstName} {usr.lastName}</td>
                        <td>{usr.email}</td>
                        <td>{actionTranslate[order.role]}</td>
                        </tr>
                        }
                    )
                })}

            </tbody>
        </table>
    }

    const productTable = () => {
        return  <table className='table'>
            <thead>
            <tr>
                <th scope='col'>id</th>
                <th scope='col'>nazwa</th>
                <th scope='col'>wysokość</th>
                <th scope='col'>szerokość</th>
                <th scope='col'>ilość</th>
                <th scope='col'>cena/szt</th>
            </tr>
            </thead>
            <tbody>
            {
                productCollection.map( (e) => e !== null && e !== undefined &&
                    <tr>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.height}</td>
                        <td>{e.width}</td>
                        <td>{orderProducts.filter((o) => o.productId === e.id)[0].quantity}</td>
                        <td>{e.price}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    }

    const source = () => {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>Infomracje o produkcie</h4>
                </div>
                <div className="row">
                    {userTable()}
                </div>

                <h5>Informacje o zamówionych produktach</h5>
                {productCollection !== undefined &&
                    <div className="row">
                        {productTable()}
                    </div>
                }
                <div className="row">
                    {workersTable()}
                </div>

                <div className='row justify-content-center align-items-center'>
                    <div className='col-sm-3 col-4 d-block'>
                        <button className='btn btn-danger' onClick={() => onReturn(0)}>Powrót</button>
                    </div>
                    <div className='col-sm-6 col-4'>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            console.log(actionSelect)
                            sendAction()
                        }}>
                            <select className='form-select-sm' value={actionSelect} onChange={(e) => {setActionSelect(e.target.value)}} required>
                                <option value="" selected disabled>Wybierz akcję</option>
                                <option value="A">Akceptuj Zamówienie</option>
                                <option value="P">Przygotuj Zamówienie</option>
                                <option value="S">Wyślij zamówienie</option>
                                <option value="Z" >Anuluj Zamówienie</option>
                            </select>
                            <button type='submit' className='btn btn-primary btn'> wykonaj akcję</button>
                        </form>
                    </div>
                    <div className='col-sm-3 d-block col-4'>
                        {!order.finished && <button className='btn btn-primary' onClick={finsihOrder}>Zakończ zamówienie</button>}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {id === -1 && pId === -1 && client  ? source() : <h1>ładowanie, proszę czekać...</h1>}
        </div>
    )
}

export default Order