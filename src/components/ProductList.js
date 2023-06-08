const ProductList = () => {
    const productList = [
        {
            id: 1,
            name: "product 1",
            price: 112
        },
        {
            id: 2,
            name: "product 12",
            price: 112
        },
        {
            id: 3,
            name: "product 3",
            price: 112
        },
        {
            id: 4,
            name: "product 4",
            price: 112
        },
    ]
    return (
        <div className='container'>
            <ul className='list-group list-group-flush'>
                {productList.map(
                    (product) =>
                        <li className='list-group-item'>
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