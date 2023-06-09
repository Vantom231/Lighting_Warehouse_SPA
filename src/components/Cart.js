import {useState} from "react";

const Cart = ({cartList, onDelete, onQuantity}) => {

    return (
        <div className='container justify-content-center align-items-center row' style={{minHeight: "80vh"}}>
            <div className='col-3'></div>
            <div className='col-6 text-dark'>
                {   cartList.length > 0 &&
                    cartList.map((cartItem) =>
                        <div className='bg-light my-2 p-3 row justify-content-between border broder-1 border-primary'>
                            <div className="col-3">
                                <h6>{cartItem.name}</h6> <br/>
                            {cartItem.price} zł
                            </div>
                            <div className='col-3 text-end row'>
                                <div className="col-6"><input type="number" value={cartItem.quantity} onChange={(e) => onQuantity(e.target.value, cartItem.productId)} className='form-text' style={{width: "40px"}}/></div>
                                <div className="col-6 text-danger" onClick={() => onDelete(cartItem.productId)}>usuń</div>


                            </div>
                        </div>
                    )}
                { cartList.length > 0 ?
                <div className='row'>
                    <div className="col-10"></div>
                    <div className="col-2">
                        <button className="btn btn-primary">Zamów</button>
                    </div>
                </div>
                    :
                 <h3> Brak przedmiotów w koszyku</h3> }


            </div>
            <div className="col-3"></div>
        </div>
    )
}

export default Cart