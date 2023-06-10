import {useState} from "react";

const Cart = ({cartList, onDelete, onQuantity, onSubmit}) => {
    const [deliver, setDeliver] = useState(false)
    const [invoice, setInvoice] = useState(false)
    const [address, setAddress] = useState("")

    return (
        <div className='container justify-content-center align-items-center row' style={{minHeight: "80vh"}}>
            <div className='col-3'></div>
            <div className='col-6 text-dark'>
                {   cartList.length > 0 &&
                    cartList.map((cartItem) =>
                        <div key={cartItem.id} className='bg-light my-2 p-3 row justify-content-between border broder-1 border-primary'>
                            <div key={`a ${cartItem.id}`} className="col-3">
                                <h6 key={`h ${cartItem.id}`}>{cartItem.name}</h6> <br/> {cartItem.price} zł
                            </div>
                            <div key={`b ${cartItem.id}`} className='col-3 text-end row'>
                                <div key={`c ${cartItem.id}`} className="col-6"><input key={`i ${cartItem.id}`} type="number" value={cartItem.quantity} onChange={(e) => onQuantity(e.target.value, cartItem.productId)} className='form-text' style={{width: "40px"}}/></div>
                                <div key={`d ${cartItem.id}`} className="col-6 text-danger" onClick={() => onDelete(cartItem.productId)}>usuń</div>


                            </div>
                        </div>
                    )}
                { cartList.length > 0 ?
                    <form onSubmit={
                        (e) => {
                            e.preventDefault()
                            onSubmit(deliver, address, invoice)
                        }}>
                        <div className="row">
                            <div className="col-3"> dostawa:
                                <input type="checkbox" className="form-check-inline" checked={deliver}
                                       onChange={(e) => setDeliver(e.target.checked)}/>
                            </div>
                            <div className="col-6">
                                {deliver && <div>adres dostawy:<input type="text" className="form-text" value={address}
                                                                      onChange={(e) => setAddress(e.target.value)}/> </div>}
                            </div>
                            <div className="col-3">
                                faktura: <input type="checkbox" className='form-check-inline' checked={invoice}
                                                onChange={(e) => setInvoice(e.target.checked)}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-10"></div>
                            <div className="col-2">
                                <button className="btn btn-primary" >Zamów</button>
                            </div>
                        </div>
                    </form>
                    :
                 <h3> Brak przedmiotów w koszyku</h3> }


            </div>
            <div className="col-3"></div>
        </div>
    )
}

export default Cart