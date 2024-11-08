import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../components/Footer.jsx';
import Card from '../components/Card.jsx';
import { fetchProducts } from '../redux/productsSlice.js';

const Products = () => {
    const [colorTodo, setColorTodo] = useState("color-3");
    const [colorRock, setColorRock] = useState("black-1");
    const [colorAlternativo, setColorAlternativo] = useState("black-1");
    const [colorPop, setColorPop] = useState("black-1");
    const [colorNacional, setColorNacional] = useState("black-1");

    const [filtroGenero, setFiltroGenero] = useState(null);
    const [filtrados, setFiltrados] = useState([]);
    const [newProduct, setNewProduct] = useState({ query: '' });

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

    console.log(products)

    const cambiarColor = (genero) => {
        setColorTodo("black-1");
        setColorRock("black-1");
        setColorAlternativo("black-1");
        setColorPop("black-1");
        setColorNacional("black-1");
        switch (genero) {
            case "":
                setColorTodo("color-3");
                break;
            case "Rock":
                setColorRock("color-3");
                break;
            case "Alternativo":
                setColorAlternativo("color-3");
                break;
            case "Pop":
                setColorPop("color-3");
                break;
            case "Nacional":
                setColorNacional("color-3");
                break;
            default:
                break;
        }
    };

    const filtrarPorGenero = (genero) => {
        cambiarColor(genero);
        setFiltroGenero(genero);
        setFiltrados(products.filter(product => !genero || product.genero === genero));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ [name]: value });
        const filtrados = products.filter(product =>
            product.title.toLowerCase().includes(value.toLowerCase()) ||
            product.subtitle.toLowerCase().includes(value.toLowerCase())
        );
        setFiltrados(filtrados);
        setFiltroGenero(null);
    };

    const productosMostrados = filtrados.length > 0 ? filtrados : products.filter(product => !filtroGenero || product.genero === filtroGenero);

    return (
        <div>
            <section id="prod-banner" className="d-flex justify-content-center align-items-center">
                <div className="padding-nav"></div>
                <h1 className="white-1 padding-nav-title">Productos</h1>
            </section>
            <main className='prod-name'>
                <div className='prod-contenido'>
                    <aside className="prod-categorias">
                        <h4 className="hover-0 mx-0">Buscar productos:</h4>
                        <div className='prod-busqueda d-flex align-items-center'>
                            <input type="text" name="query" placeholder="Título o Artista" value={newProduct.query || ''} onChange={handleChange} />
                        </div>
                        <h4 className="mt-4 mb-3 hover-0 mx-0">Filtrar por género:</h4>
                        <h4 className={colorRock} onClick={() => filtrarPorGenero('Rock')}>Rock</h4>
                        <h4 className={colorAlternativo} onClick={() => filtrarPorGenero('Alternativo')}>Alternativo</h4>
                        <h4 className={colorPop} onClick={() => filtrarPorGenero('Pop')}>Pop</h4>
                        <h4 className={colorNacional} onClick={() => filtrarPorGenero('Nacional')}>Nacional</h4>
                        <h4 className={colorTodo} onClick={() => filtrarPorGenero('')}>Ver Todo</h4>
                    </aside>
                    <section className='prod-productos'>
                        <h3>Nuestros vinilos más escuchados:</h3>
                        <div className='prod-cards'>
                            {productosMostrados.map(product => (<Card key={product.id} product={product} isHome={false} />))}
                        </div>
                        <div className="my-5 py-5"></div>
                    </section>
                </div>
            </main>
            <div id="footer-margin"></div>
            <Footer />
        </div>
    );
}

export default Products;