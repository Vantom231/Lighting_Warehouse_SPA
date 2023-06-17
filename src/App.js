import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import {useEffect} from "react";
import {useState} from "react";
import api from "./api/categories";
import Product from "./components/Product";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Cart from "./components/Cart";
import WorkPanel from "./components/WorkPanel";
import Main from "./components/Main";
import AdminPanel from "./components/AdminPanel";
import ProductSearch from "./components/ProductSearch";

function App() {
    // site variables
    const [page, setPage] = useState(1)
    const [cartList, setCartList] = useState( [])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [searchTrigger, setSearchTrigger] = useState(false)

    // worker page variables
    const [workPanelPage, setWorkPanelPage] = useState(0)


    // auth variables
    const [bearer, setBearer] = useState("")
    const [loginTrigger, setLoginTrigger] = useState(true)
    const [authUser, setAuthUser] = useState("")
    const [updateUser, setUpdateUser] = useState(false)


    // fetch categories on startup
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories')
                console.log(response.data)
                setCategories(response.data.data)
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

        fetchCategories()
    },[])

    // fetch auth user after login
    useEffect( () => {
        if ( updateUser === true && bearer !== "" ) {
            setUpdateUser(false);
            fetchAuthUser();
        }
    },[updateUser, bearer])

    //API
    //fetch all Subcategories where categoryId
    const fetchSubCategories = async (categoryId) => {
        if (categoryId === 0) {
            setSearchTrigger(true)
            setSubCategories([])
        } else {
            try {
                const response = await api.get(`/subcategories?categoryId[eq]=${categoryId}`)
                console.log(response.data)
                setSubCategories(response.data.data)
                setSearchTrigger(false)
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
    }

    //fetch all Products where subcategoryId
    const fetchProducts = async (subCategoryId) => {
        try {
            const response = await api.get(`/products?subcategoryId[eq]=${subCategoryId}`)
            console.log(response.data)
            setProducts(response.data.data)
            setProduct(null)
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

    //fetch Product where id
    const fetchProduct = async (id) => {
        try {
            const response = await api.get(`/products?id[eq]=${id}`)
            console.log(response.data)
            setProduct(response.data.data)
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

    //Register
    const register = async (email, password, firstName, lastName, pesel,
                            mailAddress, firmName, nip, firmAddress,
                            firmMailingAddress, firm) => {

        let data = {
            name: firstName,
                firstName: firstName,
            lastName: lastName,
            pesel: pesel,
            email: email,
            password: password,
            mailingAddress: mailAddress,
            accountType: firm ? 'B' : 'I',
        }
        if (firm) {
            data = {
                ...data,
                companyName: firmName,
                nip: nip,
                companyMailingAddress: firmMailingAddress,
                companyAddress: firmAddress}
        }
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/register',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data : JSON.stringify(data)
        };

        try{
            const response = await api.request(config)
            console.log(response.data)
            setAuthUser(response.data.data)
            setPage(0)

        } catch (err) {
            if (err.response) {
                //not in 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error ${err.message}`)
            }
            alert("błędne dane rejestracji")
        }

    }

    const postCustom = async (url, data) => {
        console.log(`post Custom: ${url}`)
        try {
            const response = await api.request({
                method: 'post',
                maxBodyLength: Infinity,
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearer}`
                },
                data: JSON.stringify(data),
            })

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

    const sendOrder = async (deliver, deliverAddress, invoice) => {
        console.log("ORDER SENT :))")
        let currentdate = new Date();
        let datetime = "" + currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const temp = {
            postDate: datetime,
            deliver: deliver,
            invoice: invoice,
            finished: false
        }

        const data =  deliver ? {...temp, deliverAddress} : temp
        try {

            const response = await api.request({
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/orders',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearer}`
                },
                data: JSON.stringify(data),
            })
            console.log(response)

            postCustom('http://127.0.0.1:8000/api/orderToUsers', { orderId: response.data.data.id, userId: authUser.id, role: 'C'})

            // cartList.forEach( item => await postCustom('http://127.0.0.1:8000/api/orderToProducts', {productId: item.productId, orderId: response.data.data.id, quantity: item.quantity }))
            for (let i = 0; i < cartList.length; i++) {
                postCustom('http://127.0.0.1:8000/api/orderToProducts', {productId: cartList[i].productId, orderId: response.data.data.id, quantity: cartList[i].quantity })
            }

            setCartList([])
            setPage(6)

        } catch (err) {
            if (err.response) {
                //not in 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error ${err.message}`)
            }
            changeLoginTrigger(true)
        }
    }

    // AUTH
    // Login
    const login = async (login, password) => {
        try {
            const data = JSON.stringify({
                email: login,
                password: password
            });
            const response = await api.request({
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/login',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data,
            })
            setBearer(response.data.token)
            console.log(bearer)
            setUpdateUser(true)
            setLoginTrigger(false)
        } catch (err) {
            if (err.response) {
                //not in 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error ${err.message}`)
            }
            alert("błędne dane logowania")
        }
    }

    // logout
    const logout = () => {
        setBearer("")
        setAuthUser("")
    }

    // get authenticated user
    const fetchAuthUser = async () => {
            try {
                const headers = {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${bearer}`
                }

                console.log(headers)
                const response = await api.request({
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://127.0.0.1:8000/api/user',
                    headers: headers,
                    data: ''

                })
                console.log(response.data)
                setAuthUser(response.data.data)
                setLoginTrigger(false)
            } catch (err) {
                if (err.response) {
                    //not in 200 response range
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                } else {
                    console.log(`Error ${err.message}`)
                }
                alert("błędne dane logowania")
            }

    }

    // turns on/off login screen
    const changeLoginTrigger = (bool) => {
        setLoginTrigger(bool)
    }


    //nav handler
    const changePage = (pageId) => {
        setPage(pageId)
        setLoginTrigger(false)
    }


    //cart
    //delete item from cartList
    const deleteCartItem = (id) => {
        setCartList(cartList.filter((e) => e.productId !== id))
    }

    //add item to cartList
    const addCartItem = (name, price, quantity, productId) => {
        if (cartList.filter((i) => i.productId === productId).length > 0) {
            alert("produkt znajduje się już w koszyku")
        } else {
            const newItem = {
                name: name,
                price: price,
                quantity: quantity,
                productId: productId,
            }

            setCartList([...cartList, newItem])
        }
    }

    // changes quantity of item in cartList
    const changeQuantity = (quantity, productId) => {
        setCartList(cartList.map((item) => item.productId === productId ? {...item, quantity: quantity} : item ))
    }

    // worker Panel
    // change page in Worker Panel
    const changeWorkerPanel = (page) => {
        setWorkPanelPage(page)
    }

    const returnProduct = () => {
        setProduct()
    }


    // jsx
    const pages = () => {  // home page
        if (page === 1) {
            return <Main />
        } else if (page === 2) {  // products
            return (
                <main className='row g-0'>
                    <div className="col-md-2 col-12 bg-secondary">
                        <Nav categoryList={categories} subCategoryList={subCategories} page={page} onCategory={fetchSubCategories} onSubcategory={fetchProducts} />
                    </div>
                    <div className='col-md-10 col-12' style={{minHeight: "80vh"}}>
                        {
                            product ? <Product product={product} onCart={addCartItem}  onReturn={returnProduct}/> :
                            searchTrigger ? <ProductSearch  onProduct={fetchProduct} /> :
                                <ProductList productList={products} onProduct={fetchProduct}/>
                        }
                    </div>
                </main>)
        } else if (page === 3) {  // cart
            return <Cart cartList={cartList} onDelete={deleteCartItem} onQuantity={changeQuantity} onSubmit={sendOrder}/>

        } else if (page === 4) {  // registration
            return <Registration onRegistration={register} />

        } else if (page === 5) {  // worker panel
            return (
                <main className='row g-0'>
                    <div className="col-md-2 col-12 bg-secondary">
                            <Nav page={page} onCategory={changeWorkerPanel}/>
                        </div>
                        <div className='col-md-10 col-12'>
                            <WorkPanel page={workPanelPage} changePage={changeWorkerPanel} bearer={bearer} authUser={authUser}/>

                        </div>
                    </main>
            )
        } else if (page === 6) {  // after order page
            return (
                <div className='p-5' style={{height: "80vh"}}>
                    <p>Dziękujemy za złożenie zamówienia w naszym sklepie internetowym oświetleniowym! Cieszymy się, że wybrałeś nasze produkty i powierzyłeś nam dostarczenie odpowiedniego oświetlenia do Twojego domu.</p>
                   <p>Twój zamówienie zostało przyjęte i aktualnie jest przetwarzane przez nasz zespół. Dokładamy wszelkich starań, aby zapewnić szybką i bezproblemową realizację Twojej przesyłki.</p>
                    <p>W przypadku jakichkolwiek pytań lub wątpliwości, nasz zespół obsługi klienta jest gotowy, aby Ci pomóc. Skontaktuj się z nami poprzez nasze dane kontaktowe podane na poniżej</p>
                    <p>Jeszcze raz dziękujemy za zaufanie i wybór naszego sklepu. Doceniamy Twoje wsparcie i jesteśmy pewni, że będziesz zadowolony z jakości naszych produktów. Oświetl swoje wnętrza z naszymi lampami i ciesz się pięknym światłem!</p>
                    <p>Życzymy udanych zakupów i pięknych doświadczeń z naszym oświetleniem.</p>
                    <p> Z poważaniem, <br/>
                    Zespół sklepu internetowego oświetleniowego GlowHouse</p>
                </div>
            )
        } else if (page === 7) {  // administrator panel
            return (
                <div className='p-3' style={{minHeight: "80vh"}}>
                    <AdminPanel bearer={bearer}/>
                </div>
                    )
        }
    }
  return (
    <div className="" style={{minHeight: '100vh'}}>
        <Header onLogin={changeLoginTrigger} onLogout={logout} onRegistration={() => changePage(4)} onNav={changePage} user={authUser} />

        { loginTrigger ?
                <Login onReturn={changeLoginTrigger} onLogin={login}/>
            : pages()}
        <Footer />
    </div>
  );
}

export default App;
