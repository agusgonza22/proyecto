import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from "../assets/img/logo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUser = useSelector(state => state.accounts.currentUser);
    const isAdmin = false;
    const count = currentUser && currentUser.cart ? Object.values(currentUser.cart).reduce((total, quantity) => total + quantity, 0) : 0;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-light background-color-2">
            <div id="nav-logo-div" className="d-flex align-items-center">
                <img src={logo} alt="Logo" className="navbar-brand" />
                <h1 className='fs-28 fw-bold color-1 ms-2'>Leyys</h1>
            </div>

            <button 
                className="navbar-toggler" 
                type="button" 
                onClick={toggleMenu}
                aria-expanded={isMenuOpen ? 'true' : 'false'} 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                <ul className="navbar-nav ms-auto text-center"> {/* Asegúrate de usar text-center aquí */}
                    <li className="nav-item ">
                        <Link className="nav-link color-3 fw-bold" to="/" onClick={() => window.scrollTo(0, 0)}>Inicio</Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link color-3 fw-bold" to="/Products" onClick={() => window.scrollTo(0, 0)}>Productos</Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/Cart" onClick={() => window.scrollTo(0, 0)}>Carrito</Link>
                        </li>
                    )}
                    {currentUser ? (
                        <li className="nav-item">
                            <Link className="nav-link" to='/Login' onClick={() => window.scrollTo(0, 0)}>
                                <i className="bi bi-person-circle pe-2"></i>
                                {currentUser.name}
                            </Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link to='/Login' onClick={() => window.scrollTo(0, 0)} className="nav-link color-3 fw-bold">Iniciar sesión</Link>
                        </li>
                    )}
                </ul>
                {currentUser && (
                    <Link to="/Cart" className="nav-cart black-1">
                        <i className="bi bi-cart-fill px-1"></i>
                        <div id="nav-count">{count}</div>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
