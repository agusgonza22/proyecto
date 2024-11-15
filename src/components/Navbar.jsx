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
        // 
        <nav className={`navbar background-color-2 navbar-expand-md navbar-light`}>
            <div className="d-flex align-items-center">
                <img src={logo} alt="Logo" className="navbar-brand" />
                <h1 className="fs-28 fw-bold color-1 ms-2 titulo">Leyys</h1>
            </div>
           
            <button
                className="navbar-toggler d-md-none color-3"
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen ? "true" : "false"}
                aria-label="Toggle navigation"
            >
                <i className="bi bi-list color-3"></i>
            </button>
            
            <ul className={`nav-links d-none d-md-flex ${isMenuOpen ? "show" : ""}`}>
                <li>
                    <Link
                        className="color-3 fw-bold"
                        to="/"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link
                        className="color-3 fw-bold"
                        to="/Products"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        Productos
                    </Link>
                </li>
                {currentUser && (
                <li>
                    <Link to="/Cart" onClick={() => window.scrollTo(0, 0)}>
                    Carrito
                    </Link>
                </li>
                )}
            </ul>
            
            <div className="nav-derecha nav-links d-none d-md-flex">
                {currentUser ? (
                <div>
                    <Link
                    to="/Login"
                    onClick={() => window.scrollTo(0, 0)}
                    >
                    <i className="bi bi-person-circle pe-2"></i>
                    {currentUser.name}
                    </Link>
                </div>
                ) : (
                <div>
                    <Link
                    to="/Login"
                    onClick={() => window.scrollTo(0, 0)}
                    className="color-3 fw-bold"
                    >
                    Iniciar sesión
                    </Link>
                </div>
                )}
                {currentUser && (
                <Link to="/Cart" className="nav-cart color-3">
                    <i className="bi bi-cart-fill px-1"></i>
                    <div id="nav-count">{count}</div>
                </Link>
                )}
            </div>
          
            <div className={`menu-dropdown background-color-2 d-md-none ${isMenuOpen ? "show" : ""}`}>
                <ul>
                    <li className='link'>
                        <Link
                        className="color-3 fw-bold"
                        to="/"
                        onClick={() => window.scrollTo(0, 0)}
                        >
                        Inicio
                        </Link>
                    </li>
                    <li className='link'>
                        <Link
                        className="color-3 fw-bold"
                        to="/Products"
                        onClick={() => window.scrollTo(0, 0)}
                        >
                        Productos
                        </Link>
                    </li>
                    {currentUser && (
                        <li className='link'>
                        <Link to="/Cart" onClick={() => window.scrollTo(0, 0)}>
                            Carrito
                        </Link>
                        </li>
                    )}
                    {currentUser ? (
                    <div className='usuario-dropdown'>
                        <Link
                        to="/Login"
                        onClick={() => window.scrollTo(0, 0)}
                        >
                        <i className="bi bi-person-circle pe-2"></i>
                        {currentUser.name}
                        </Link>
                        <Link to="/Cart" className="nav-cart color-3">
                            <i className="bi bi-cart-fill px-1"></i>
                            <div id="nav-count">{count}</div>
                        </Link>
                    </div>
                    ) : (
                    <div>
                        <Link
                        to="/Login"
                        onClick={() => window.scrollTo(0, 0)}
                        className="color-3 fw-bold"
                        >
                        Iniciar sesión
                        </Link>
                    </div>
                    )}
                
                </ul>
            </div>
        </nav>

    );
};

export default Navbar;
