import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './components/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderCancelled from './pages/OrderCancelled';
import Contact from './pages/Contact';
import About from './pages/About';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Impressum from './pages/Impressum';
import Account from './pages/Account';

function Reset() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return null;
}

export default function App() {
  return <HashRouter><LanguageProvider><CurrencyProvider><AuthProvider><CartProvider><Reset /><Navbar /><main className="min-h-screen bg-[#0a0a0a]"><Routes><Route path="/" element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/products/:id" element={<ProductDetail />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/order-success" element={<OrderSuccess />} /><Route path="/order-cancelled" element={<OrderCancelled />} /><Route path="/contact" element={<Contact />} /><Route path="/about" element={<About />} /><Route path="/shipping" element={<Shipping />} /><Route path="/returns" element={<Returns />} /><Route path="/terms" element={<Terms />} /><Route path="/privacy" element={<Privacy />} /><Route path="/impressum" element={<Impressum />} /><Route path="/account" element={<Account />} /></Routes></main><Footer /><CookieBanner /></CartProvider></AuthProvider></CurrencyProvider></LanguageProvider></HashRouter>;
}
