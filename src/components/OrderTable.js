import {useState} from "react";
import Order from "./Order";

const OrderTable = ({orders, updateOrdersCustom, bearer, changePage, page, refresh}) => {
    const [orderPage, setOrderPage] = useState(0)
    const [id, setId] = useState(0)

    const viewOrder = (id) => {
        setId(id)
        setOrderPage(1)
    }

    const backToList = (id) => {
        refresh()
        setOrderPage(0)
    }

    const table = () => {
        return (
            <div>
                <h4>Zamówienia otwarte</h4>
                <table className='table table-hover'>
                <thead>
                <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>data Dodadania</th>
                    <th scope='col'>data zakońćzenia</th>
                    <th scope='col'>czy dostawa</th>
                    <th scope='col'>adres dostawy</th>
                    <th scope='col'>czy faktura</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.data.map((single) =>
                        <tr key={single.id} onClick={() => viewOrder(single.id)}>
                            <th scope={'row'}>{single.id}</th>
                            <td>{single.postDate}</td>
                            <td>{single.sendDate}</td>
                            <td>{single.deliver === 1 ? 'tak' : 'nie'}</td>
                            <td>{single.deliverAddress}</td>
                            <td>{single.invoice === 1 ? 'tak' : 'nie'}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>

                <div className='row p-3 justify-content-between'>
                    <div className='col-2'>
                        {!orders.links.prev ? "" :
                            <button className="btn btn-primary"
                                    onClick={() => updateOrdersCustom(orders.links.prev)}>poprzednia</button>
                        }
                    </div>
                    <div className='col-2'>
                        {!orders.links.next ? "" :
                            <button className="btn btn-primary"
                                    onClick={() => updateOrdersCustom(orders.links.next)}>następna</button>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return orderPage === 0 ?
       orders && orders.data && orders.data.length > 0 && table():
        <Order order={orders.data.filter((e) => e.id === id)[0]} bearer={bearer} onReturn={backToList} changePage={changePage} page={page}/>

}

export default OrderTable