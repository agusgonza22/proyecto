import React from 'react';
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-100 background-color-2 p-1 container-fluid">
      <div className="row justify-content-center justify-content-md-between align-items-center w-100">
        
       
        <div className="col-12 col-md-3 d-flex justify-content-center mb-3 mb-md-0">
          <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '150px' }} />
        </div>

      
        <div id="footer-links" className="col-12 col-md-3 d-flex flex-column align-items-center mb-3 mb-md-0">
          <Link to="/" className="footer-link text-decoration-none color-3 mb-2" onClick={() => window.scrollTo(0, 0)}>
            Inicio
          </Link>
          <Link to="/Products" className="footer-link text-decoration-none color-3 mb-2" onClick={() => window.scrollTo(0, 0)}>
            Productos
          </Link>
          <Link to="/Cart" className="footer-link text-decoration-none color-3 mb-2" onClick={() => window.scrollTo(0, 0)}>
            Carrito
          </Link>
        </div>

      
        <div className="col-12 col-md-3 d-flex justify-content-center mb-3 mb-md-0">
          <a href="#" className="mx-2">
            <i className="bi bi-instagram color-3"></i>
          </a>
          <a href="#" className="mx-2">
            <i className="bi bi-twitter-x color-3"></i>
          </a>
          <a href="#" className="mx-2">
            <i className="bi bi-tiktok color-3"></i>
          </a>
        </div>

      </div>

     
      <div className="w-100 text-center mt-5">
        <h3 className="color-0 cursor-default fs-6 mb-0">
          © 2024 Leyys. Todos los derechos reservados.
        </h3>
      </div>
    </footer>
  );
}

export default Footer;
