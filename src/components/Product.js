import React from "react";

const Product = ({product, onCart, onReturn}) => {
    const single = product[0]
    return (
        <div>
            {single &&
            <div className="row g-0">
                <div className='col-md-6 justify-content-center'>

                    <div className='jusitfy-content-center'>
                        <img src={single.imgPath} alt="zdjecie produktu" className='img-fluid d-block mx-auto my-3'/>
                    </div>

                    <div className='col-12 h4 text-center p-3'>
                        {single && single.name}
                    </div>

                    <p className='m-4 p-3 bg-light' style={{textAlign: "justify"}}>
                        {single.description}
                    </p>

                    <div className='row justify-content-end g-0 my-3'>
                        <div className='col-md-4 col-12 justify-content-start ps-4'>
                            <button className='btn btn-outline-primary' onClick={onReturn}>Powrot</button>
                        </div>
                        <div className='col-md-4 col-6 text-end pe-4 pt-1'>
                            {single.price} zł
                        </div>
                        <div className='col-md-4 col-6 justify-content-start'>
                            <button className='btn btn-outline-primary' onClick={() => onCart(single.name, single.price, 1, single.id)}>Dodaj do koszyka!</button>
                        </div>
                    </div>

                </div>
                <div className="col-md-6 p-3">
                    <table className='table table-striped table-responsive table-sm'>
                        <tbody><tr>
                            <th scope='row'>wysokość: </th>
                            <td>{single.height}</td>
                        </tr></tbody>
                        <tbody><tr>
                            <th scope='row'>szerokość: </th>
                            <td>{single.width}</td>
                        </tr></tbody>
                        {single.baseMaterial &&
                            <tbody><tr>
                                <th scope='row'>Material podstawy: </th>
                                <td>{single.baseMaterial}</td>
                            </tr></tbody>
                        }
                        {single.lightSource &&
                            <tbody><tr>
                                <th scope='row'>Źródło światła: </th>
                                <td>{single.lightSource}</td>
                            </tr></tbody>
                        }
                        {single.lightSourceConnectors &&
                            <tbody><tr>
                                <th scope='row'>typ źródła światła: </th>
                                <td>{single.lightSourceConnectors}</td>
                            </tr></tbody>
                        }
                        {single.lightSourceQuantity &&
                            <tbody><tr>
                                <th scope='row'>ilość źródeł światła: </th>
                                <td>{single.lightSourceQuantity}</td>
                            </tr></tbody>
                        }
                        {single.power &&
                            <tbody><tr>
                                <th scope='row'>moc: </th>
                                <td>{single.power}</td>
                            </tr></tbody>
                        }
                        {single.lumens &&
                            <tbody><tr>
                                <th scope='row'>lumeny: </th>
                                <td>{single.lumens}</td>
                            </tr></tbody>
                        }
                        {single.colorTemperatureMin &&
                            <tbody><tr>
                                <th scope='row'>minimalna temperatura światła: </th>
                                <td>{single.colorTemperatureMin}</td>
                            </tr></tbody>
                        }
                        {single.colorTemperatureMax &&
                            <tbody><tr>
                                <th scope='row'>maksymalna temperatura światła: </th>
                                <td>{single.colorTemperatureMax}</td>
                            </tr></tbody>
                        }
                        {single.energyClassNew &&
                            <tbody><tr>
                                <th scope='row'>klasa energetyczna(nowa): </th>
                                <td>{single.energyClassNew}</td>
                            </tr></tbody>
                        }
                        {single.energyClassOld &&
                            <tbody><tr>
                                <th scope='row'>klasa energetyczna(stara): </th>
                                <td>{single.energyClassOld}</td>
                            </tr></tbody>
                        }

                    </table>
                </div>
            </div>
            }
        </div>
    )
}

export default Product