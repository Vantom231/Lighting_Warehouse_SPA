import React, {useState} from "react";
import api from "../api/categories";

const ProductSearch = ({onProduct}) => {
    const [productList, setProductList] = useState([])

    const fetchProducts = async (text) => {
        try {
            const response = await api.get(`/products?name[like]=%${text}%`)
            console.log(response.data)
            setProductList(response.data.data)
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

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            fetchProducts(event.target.value)
        }
    }

    return <div>
        <div className='w-100 p-3'>

            <input className='form-text input-group-text w-100' type="text" placeholder='wyszukaj' onKeyPress={handleKeyPress} />

            <ul className='list-group list-group-flush'>
                {productList && productList.map(
                    (product) =>
                        <li key={product.id} className='list-group-item hover-zoom'>
                            <div className="row col-12  justify-content-between py-3" onClick={() => onProduct(product.id)}>
                                <div className='col-3 row align-items-center'>
                                    <div className="col-6">
                                        <img src={product.imgPath} alt="zdjecie produktu" className='img-fluid d-block mx-auto my-3 w-100'/>
                                    </div>
                                    <div className='col-6'>{product.name}</div>
                                </div>
                                <div className='col-3'>
                                    <div className='float-end'>
                                        {product.price} zł
                                    </div>
                                </div>
                            </div>
                        </li>
                )}
            </ul>
        </div>
    </div>
}

export default ProductSearch
