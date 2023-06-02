
import './App.css';
import Rejestracja from './components/Account/Rejestracja';
import Zaloguj from './components/Account/Zaloguj';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sluchawki from './components/MainContent/Categories/Sluchawki';
import Myszki from './components/MainContent/Categories/Myszki';
import Klawiatury from './components/MainContent/Categories/Klawiatury';
import Podkladki from './components/MainContent/Categories/Podkladki';
import ProductPage from './components/MainContent/ProductPage';
import AcceptBuy from './components/MainContent/AcceptBuy';
import AfterBuyProduct from './components/MainContent/AfterBuyProduct';
import { CartProvider } from './Context/CartContext';
import SearchComponent from './components/MainContent/SearchComponent';
import PaymentHistory from './components/Account/PaymentHistory';



function App() {

  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/zaloguj" element={<Zaloguj />}></Route>
        <Route path="/rejestracja" element={<Rejestracja />}></Route>
        <Route path="/sluchawki" element={<Sluchawki />}></Route>
        <Route path="/myszki" element={<Myszki />}></Route>
        <Route path="/klawiatury" element={<Klawiatury />}></Route>
        <Route path="/podkladki" element={<Podkladki />}></Route>
        <Route path='/product/:id' element={<ProductPage />}></Route>
        <Route path='/sluchawki/product/:id' element={<ProductPage />}></Route>
        <Route path='/myszki/product/:id' element={<ProductPage />}></Route>
        <Route path='/klawiatury/product/:id' element={<ProductPage />}></Route>
        <Route path='/podkladki/product/:id' element={<ProductPage />}></Route>
        <Route path='/search/product/:id' element={<ProductPage />}></Route>
        <Route path='/acceptbuy' element={<AcceptBuy />}></Route>
        <Route path='/orderproduct' element={<AfterBuyProduct />}></Route>
        <Route path='/search' element={<SearchComponent />}></Route>
        <Route path='/historypayment' element={<PaymentHistory />}></Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
