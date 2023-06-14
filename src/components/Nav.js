import {useState} from "react";


const Nav = ({categoryList, subCategoryList, onCategory, onSubcategory, page}) => {
    return (<nav>
        <div className="text-light" color="white">
            <div className="py-2">

                {page === 2 && <div className="border-bottom">
                        <p className='h5'>Kateogrie</p>
                    </div>
                }

                <div className="p-3">
                    <ul className='nav'>
                        {page === 2 && categoryList.map(
                                (category) =>
                                    <li key={category.id} className={'nav-item btn btn-outline-light col-12 mb-1 border-bottom-0'}><div onClick={() => onCategory(category.id)}>{category.name}</div></li>
                        )}
                    </ul>
                </div>

                {page === 2 && <div>
                    <div className="border-bottom">
                        <p className="h6">PodKateogrie</p>
                    </div>

                    <div className="p-3">
                        {subCategoryList &&
                            <ul className='nav'>
                                {subCategoryList.map(
                                    (subCategory) =>
                                        <li key={subCategory.id} className={'nav-item btn btn-outline-light col-12 mb-1 border-bottom-0'}><div onClick={() => onSubcategory(subCategory.id)}>{subCategory.name}</div></li>
                                )}
                            </ul>
                        }
                    </div>
                </div>}

                {page === 5 &&
                    <div>
                        <div className="border-bottom">
                            <p className="h6">Menu: </p>
                        </div>

                        <ul className='nav'>
                                    <li className={'nav-item btn btn-outline-light col-12 mb-1'}><div onClick={() => onCategory(1)}>Podsumowanie</div></li>
                                    <li className={'nav-item btn btn-outline-light col-12 mb-1'}><div onClick={() => onCategory(2)}>Zamówienia Otwarte</div></li>
                                    <li className={'nav-item btn btn-outline-light col-12 mb-1'}><div onClick={() => onCategory(3)}>Zamówienia zamknięte</div></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    </nav>)
}

export default Nav