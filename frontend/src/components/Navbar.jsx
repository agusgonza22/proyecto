import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from "../assets/img/logo.png";

const Navbar = () => {
    const currentUser = useSelector(state => state.accounts.currentUser);
    const isAdmin = false;
    const count = currentUser && currentUser.cart ? Object.values(currentUser.cart).reduce((total, quantity) => total + quantity, 0) : 0;

    return (
        <nav className='d-flex align-items-center justify-content-between background-color-2'>
            <div id="nav-logo-div" className="d-flex align-items-center">
                <img src={logo} alt="Logo" />
                <h1 className='fs-28 fw-bold color-1'>Leyys</h1>
            </div>
            <div className='nav-pages'>
                <ul className='nav-links d-flex color-3 p-0 ps-4 fw-bold'>
                    {!isAdmin && <div className="ps-1"></div>}
                    <li><Link to='/' onClick={() => window.scrollTo(0, 0)}>Inicio</Link></li>
                    <li><Link to='/Products' onClick={() => window.scrollTo(0, 0)}>Productos</Link></li>
                    {currentUser && <li><Link to='/Cart' onClick={() => window.scrollTo(0, 0)}>Carrito</Link></li>}
                </ul>
            </div>
            {currentUser ? <div id="nav-acc-div" className="d-flex align-items-center justify-content-end">
                <ul className='nav-links color-3 p-0 m-0 nav-login'>
                    <li>
                        <Link to='/Login' onClick={() => window.scrollTo(0, 0)}>
                            <i className="bi bi-person-circle pe-2"></i>
                            {currentUser.name}
                        </Link>
                    </li>
                </ul>
                <Link to="/Cart" className='nav-cart black-1'>
                    <i className="bi bi-cart-fill px-1"></i>
                    <div id="nav-count">{count}</div>
                </Link>
            </div> : <div id="nav-acc-div" className="d-flex align-items-center justify-content-end"><span className='nav-links color-3 p-0 m-0 nav-login'><Link to='/Login' onClick={() => window.scrollTo(0, 0)}> Iniciar sesión</Link></span></div>}
        </nav>
    );
}

export default Navbar;
