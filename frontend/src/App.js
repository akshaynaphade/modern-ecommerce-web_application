import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Listing';
import CartPage from './components/Cart';
import Signup from './components/Signup';
import Login from './components/Login';

export default function App(){
  return (
    <Router>
      <div className="container">
        <header className="nav">
          <div style={{fontWeight:800,fontSize:18,color:'#16a34a'}}>Modern Ecommerce</div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </nav>
        </header>

        <main>
          <section className="hero">
            <h1 style={{fontSize:32,margin:0}}>Shop modern. Shop simple.</h1>
            <p style={{color:'#6b7280',marginTop:8}}>A lightweight demo e-commerce for your internship submission.</p>
          </section>

          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <footer className="footer">© {new Date().getFullYear()} Modern Ecommerce — Built for demo</footer>
      </div>
    </Router>
  );
}
