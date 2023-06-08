import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import {useEffect} from "react";
import {useState} from "react";
import api from "./api/categories";
import Product from "./components/Product";

function App() {
    const [categories, setCategories] = useState([{id:100,name:"test"}, {id:101,name:"test2"}])
    const [subCategories, setSubCategories] = useState([])
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])

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

  return (
    <div>
        <Header />
        <main className='row g-0'>
            <div className="col-2 bg-secondary" style={{minHeight: '80vh'}}>
                <Nav categoryList={categories} subCategoryList={subCategories} onCategory={fetchSubCategories} onSubcategory={fetchProducts} />
            </div>
            <div className='col-10' style={{minHeight: '80vh'}}>
                {
                    product ? <Product product={product}/> : <ProductList productList={products} onProduct={fetchProduct}/>
                }
            </div>
        </main>

        <Footer />
    </div>
  );
}

export default App;
