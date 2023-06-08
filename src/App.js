import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
        <Header />

        <main className='row g-0'>
            <div className="col-2 bg-secondary" style={{minHeight: '80vh'}}><Nav /></div>
            <div className='col-10' style={{minHeight: '80vh'}}>
                <ProductList />
            </div>
        </main>

        <Footer />
    </div>
  );
}

export default App;
