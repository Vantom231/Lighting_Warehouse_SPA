const ProductList = ({productList, onProduct}) => {

    return (
        <div className='container' style={{minHeight: "80vh"}}>
            <ul className='list-group list-group-flush'>
                {productList && productList.map(
                    (product) =>
                        <li key={product.id} className='list-group-item hover-zoom'>
                            <div className="row col-12  justify-content-between py-3" onClick={() => onProduct(product.id)}>
                                <div className='col-3 row'>
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
    )
}

export default ProductList