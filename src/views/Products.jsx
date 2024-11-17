import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Footer from '../components/Footer.jsx';
import Card from '../components/Card.jsx';
import { fetchProducts } from '../redux/productsSlice.js';

const Products = () => {

    const currentUser = useSelector(state => state.accounts.currentUser);
    const [colorTodo, setColorTodo] = useState("white-1");
    const [colorPremier, setColorPremier] = useState("black-1");
    const [colorLaLiga, setColorLaLiga] = useState("black-1");
    const [colorSerieA, setColorSerieA] = useState("black-1");
    const [colorPrimeraDivision, setColorPrimeraDivision] = useState("black-1");

    const [filtroLiga, setFiltroLiga] = useState(null);
    const [filtrados, setFiltrados] = useState([]);
    const [newProduct, setNewProduct] = useState({ query: '' });

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const cambiarColor = (liga) => {
        setColorTodo("black-1");
        setColorPremier("black-1");
        setColorLaLiga("black-1");
        setColorSerieA("black-1");
        setColorPrimeraDivision("black-1");
        switch (liga) {
            case "":
                setColorTodo("white-1");
                break;
            case "premier_league":
                setColorPremier("white-1");
                break;
            case "la_liga":
                setColorLaLiga("white-1");
                break;
            case "serie_a":
                setColorSerieA("white-1");
                break;
            case "primera_division":
                setColorPrimeraDivision("white-1");
                break;
            default:
                break;
        }
    };

    const filtrarPorLiga = (liga) => {
        cambiarColor(liga);
        setFiltroLiga(liga);
        setFiltrados(products.filter(product => !liga || product.liga === liga));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ [name]: value });
        let filtrados = products.filter(product =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        setFiltrados(filtrados);
        setFiltroLiga(null);
    };

    const productosMostrados = filtrados.length > 0 ? filtrados : products.filter(product => !filtroLiga || product.liga === filtroLiga);

    return (
        <div>
            <section id="prod-banner" className="d-flex justify-content-center align-items-center">
              
                <h2 className="white-1 padding-nav-title fw-bold fs-56">Productos</h2>
            </section>
            <div className="row h-100">
            
                <div className="col-12 col-md-4 d-flex flex-column justify-content-md-start p-5  justify-content-center background-color-1 p-3" >
                    <h4>Buscar productos:</h4>
                    <div className="d-flex align-items-center mb-3">
                        <input 
                            type="text" 
                            name="query" 
                            placeholder="Club o año" 
                            value={newProduct.query || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                        />
                    </div>

                    <h4>Filtrar por liga:</h4>
                    <div className="mb-3 pointer">
                        <h4 className={colorPremier} onClick={() => filtrarPorLiga('premier_league')}>Premier League</h4>
                        <h4 className={colorLaLiga} onClick={() => filtrarPorLiga('la_liga')}>La Liga</h4>
                        <h4 className={colorSerieA} onClick={() => filtrarPorLiga('serie_a')}>Serie A</h4>
                        <h4 className={colorPrimeraDivision} onClick={() => filtrarPorLiga('primera_division')}>Primera División</h4>
                        <h4 className={colorTodo} onClick={() => filtrarPorLiga('')}>Ver Todo</h4>
                    </div>
                </div>


               
                <div className="col-12 col-md-8 h-100 p-3 articulos">
                    <h3 className="text-center ">Nuestras camisetas más vendidas:</h3>
                    {!currentUser && <span className="text-center leyenda color-3">Debes iniciar sesión para poder comprar artículos.</span>}
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        {productosMostrados.map(product => (
                            <div key={product.id} className="d-flex justify-content-center align-items-center">
                                <Card product={product} isHome={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Products;
