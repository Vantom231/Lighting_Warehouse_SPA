

const Nav = ({categoryList, subCategoryList, onCategory, onSubcategory}) => {


    const subcategoryList = [
        {
            id: 1,
            name: "subcat1",
        },
        {
            id: 2,
            name: "subcat2",
        },
        {
            id: 3,
            name: "subcat3",
        },
        {
            id: 4,
            name: "subcat4",
        },
    ]
    return <nav>
        <div className="bg-secondary text-light" color="white">
            <div className="py-2">

                <div className="border-bottom">
                    <p className='h5'>Kateogrie</p>
                </div>

                <div className="p-3">
                    <ul className='nav'>
                        {categoryList.map(
                                (category) =>
                                    <li key={category.id} className={'nav-item col-12 mb-1'}><div onClick={() => onCategory(category.id)}>{category.name}</div></li>
                        )}
                    </ul>
                </div>

                <div className="border-bottom">
                    <p className="h6">PodKateogrie</p>
                </div>

                <div className="p-3">
                    {subCategoryList &&
                    <ul className='nav'>
                        {subCategoryList.map(
                            (subCategory) =>
                                <li key={subCategory.id} className={'nav-item col-12 mb-1'}><div onClick={() => onSubcategory(subCategory.id)}>{subCategory.name}</div></li>
                        )}
                    </ul>
                    }
                </div>
            </div>
        </div>
    </nav>
}

export default Nav