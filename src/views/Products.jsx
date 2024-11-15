import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../components/Footer.jsx';
import Card from '../components/Card.jsx';
import { fetchProducts } from '../redux/productsSlice.js';

const Products = () => {
    const [colorTodo, setColorTodo] = useState("color-3");
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
                setColorTodo("color-3");
                break;
            case "premier_league":
                setColorPremier("color-3");
                break;
            case "la_liga":
                setColorLaLiga("color-3");
                break;
            case "serie_a":
                setColorSerieA("color-3");
                break;
            case "primera_division":
                setColorPrimeraDivision("color-3");
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
                {/* <div className="padding-nav"></div> */}
                <h2 className="white-1 padding-nav-title fw-bold fs-56">Productos</h2>
            </section>
            <main className="d-flex flex-column">
                <div className="row">
                    {/* Sidebar de filtros */}
                    <aside className="col-12 col-md-3 mb-4 mb-md-0">
                        <div className="prod-categorias background-color-1">
                            <h4 className="mx-0 prod-categorias-title">Buscar productos:</h4>
                            <div className="prod-busqueda d-flex align-items-center">
                                <input 
                                    type="text" 
                                    name="query" 
                                    placeholder="Club o año" 
                                    value={newProduct.query || ''} 
                                    onChange={handleChange} 
                                    className="form-control"
                                />
                            </div>
                            <h4 className="mt-4 mb-3 mx-0 prod-categorias-title">Filtrar por liga:</h4>
                            <h4 className={colorPremier} onClick={() => filtrarPorLiga('premier_league')}>Premier League</h4>
                            <h4 className={colorLaLiga} onClick={() => filtrarPorLiga('la_liga')}>La Liga</h4>
                            <h4 className={colorSerieA} onClick={() => filtrarPorLiga('serie_a')}>Serie A</h4>
                            <h4 className={colorPrimeraDivision} onClick={() => filtrarPorLiga('primera_division')}>Primera División</h4>
                            <h4 className={colorTodo} onClick={() => filtrarPorLiga('')}>Ver Todo</h4>
                        </div>
                    </aside>

                    {/* Productos */}
                    <section className="col-12 col-md-9">
                        <h3>Nuestras camisetas más vendidas:</h3>
                        <div className="row">
                            {productosMostrados.map(product => (
                                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <Card product={product} isHome={false} />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Products;
