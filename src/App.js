import Header from 'components/Header/Header';
import './styles/App.scss';
import Footer from 'components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from 'Pages/HomePage';
import ShopNow from 'components/ShopNow/ShopNow';
import Search from 'components/Search/Search';
import { CartProvider } from "context/CartContext";
import Checkout from 'components/Checkout/Checkout';
import Cart from 'components/Cart/Cart';
import ThankYou from 'Pages/ThankYou';
import ProtectedRoute from 'ProtectedRoute';
import Unauthorized from 'Pages/Unauthorized';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopNow />} />
          <Route path="/search" element={<Search />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
