import { Routes, Route, HashRouter } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import Navbar from "./components/Navbar.jsx";
import Login from './views/Login.jsx'
import Pago from './views/Pago.jsx';
import Home from './views/Home.jsx';
import Cart from './views/Cart.jsx';
import Products from './views/Products.jsx';

import './assets/css/styles.css';

function App() {

  const [isNavHidden, setIsNavHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  
  useEffect(() => {
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) {
            if (isNavHidden) {
                navBar.style.transform = 'translateY(0)';
                setIsNavHidden(false);
            }
        } else {
            if (!isNavHidden) { 
                navBar.style.transform = 'translateY(-100%)';
                setIsNavHidden(true);
            }
        }

        setPrevScrollPos(currentScrollPos);
    };

    const navBar = document.querySelector('nav');
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavHidden, prevScrollPos,]);

  return (
    <HashRouter>
      <Navbar />
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/payment' element={<Pago />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
