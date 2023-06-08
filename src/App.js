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
import registration from "./components/Registration";

function App() {
    const [page, setPage] = useState(0)
    const [categories, setCategories] = useState([{id:100,name:"test"}, {id:101,name:"test2"}])
    const [subCategories, setSubCategories] = useState([])
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [bearer, setBearer] = useState("")
    const [loginTrigger, setLoginTrigger] = useState(true)
    const [authUser, setAuthUser] = useState("")
    const [updateUser, setUpdateUser] = useState(false)

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
        //fetchProduct(1)
        console.log(categories)
    },[])

    useEffect( () => {
        if ( updateUser === true && bearer !== "" ) {
            fetchAuthUser();
            setUpdateUser(false);
        }
    },[updateUser, bearer])

    //return all Subcategories where categoryId
    const fetchSubCategories = async (categoryId) => {
        try {
            const response = await api.get(`/subcategories?categoryId[eq]=${categoryId}`)
            console.log(response.data)
            setSubCategories(response.data.data)
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

    //return all Products where subcategoryId
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

    //return Product where id
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
    const register = async (email, password, firstName, lastName, pesel, mailAddress, firmName, nip, firmAddress, firmMailingAddress, firm) => {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/register',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data : JSON.stringify({
                name: firstName,
                firstName: firstName,
                lastName: lastName,
                pesel: pesel,
                email: email,
                password: password,
                mailingAddress: mailAddress,
                accountType: firm ? 'B' : 'I',
                companyName: firmName,
                nip: nip,
                companyMailingAddress: firmMailingAddress,
                companyAddress: firmAddress
            })
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
            alert("błędne dane logowania")
        }

    }

    //Login
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
            console.log(response.data.token)
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

    //logout
    const logout = () => {
        setBearer("")
        setAuthUser("")
    }

    //get authenticated user
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

    //turns on/off login screen
    const changeLoginTrigger = (bool) => {
        setLoginTrigger(bool)
    }

    //nav handler
    const changePage = (pageId) => {
        setPage(pageId)
        setLoginTrigger(false)
    }

    const pages = () => {
        if (page === 1) {
            return (<main className='row g-0 ' style={{minHeight: "80vh"}}>
                <h1>Hello</h1>
            </main>)
        } else if (page === 2) {
            return (<main className='row g-0'>
                <div className="col-2 bg-secondary" style={{minHeight: '80vh'}}>
                    <Nav categoryList={categories} subCategoryList={subCategories} onCategory={fetchSubCategories} onSubcategory={fetchProducts} />
                </div>
                <div className='col-10' style={{minHeight: '80vh'}}>
                    {
                        product ? <Product product={product}/> : <ProductList productList={products} onProduct={fetchProduct}/>
                    }
                </div>
            </main>)
        } else if (page === 3) {
            return (<main className='row g-0' style={{minHeight: "80vh"}}>
                <h1>KOSZ</h1>
            </main>)
        } else if (page === 4) {
            return (<main className='row g-0' style={{minHeight: "80vh"}}>
                <Registration onRegistration={register} />
            </main>)
        }
    }

  return (
    <div>
        <Header onLogin={changeLoginTrigger} onLogout={logout} onRegistration={() => changePage(4)} onNav={changePage} user={authUser} />

        { loginTrigger ?
            <div className='container align-content-center justify-content-center' style={{minHeight: '80vh'}}>
                <Login onReturn={changeLoginTrigger} onLogin={login}/>
            </div>
            : pages()}
        <Footer />
    </div>
  );
}

export default App;
