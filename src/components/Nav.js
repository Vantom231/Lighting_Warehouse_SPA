const Nav = () => {
    const categoryList = [
        {
            id: 1,
            name: "cat1",
        },
        {
            id: 2,
            name: "cat2",
        },
        {
            id: 3,
            name: "cat3",
        },
        {
            id: 4,
            name: "cat4",
        },
    ]

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
                                    <li className={'nav-item col-12 mb-1'}>{category.name}</li>
                        )}
                    </ul>
                </div>

                <div className="border-bottom">
                    <p className="h6">PodKateogrie</p>
                </div>

                <div className="p-3">
                    <ul className='nav'>
                        {subcategoryList.map(
                            (subcategory) =>
                                <li className={'nav-item col-12 mb-1'}>{subcategory.name}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
}

export default Nav