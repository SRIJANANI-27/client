import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Cart from './components/Cart';
import { useState, useEffect } from 'react';
import Login from './screens/Login'
import Register from './screens/Register';


function App() {
  // Retrieve cart data from localStorage or initialize it as an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleclick = (pizza) => {
    let isPresent = cart.some((item) => item._id === pizza._id && item.variant === pizza.variant);
    if (isPresent) {
      setCart(
        cart.map((item) =>
          item._id === pizza._id && item.variant === pizza.variant
            ? { ...item, quantity: item.quantity + pizza.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, pizza]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar size={cart.length} navigateTo={(path) => window.location.href = path} />
        <Routes>
          <Route path="/" element={<Home handleclick={handleclick} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
