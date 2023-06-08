const ProductList = ({productList}) => {

    return (
        <div className='container'>
            <ul className='list-group list-group-flush'>
                {productList.map(
                    (product) =>
                        <li key={product.id} className='list-group-item'>
                            <div className="row col-12  justify-content-between py-3">
                                <div className='col-3'>{product.name}</div>
                                <div className='col-1'>{product.price} zł</div>
                            </div>
                        </li>
                )}
            </ul>

        </div>
    )
}

export default ProductList