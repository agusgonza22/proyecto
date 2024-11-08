import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice.js';

import Footer from '../components/Footer.jsx';
import Card from '../components/Card.jsx';

const Home = () => {
  
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <section id="home-banner" className="d-flex justify-content-center align-items-center">
                <div className="padding-nav"></div>
                <h1 className="white-1 padding-nav-title cursor-default">Explora la música en vinilo</h1>
            </section>
            <main id="home-novedades" className="background-color-0 d-flex flex-column justify-content-center align-items-center cursor-default">
                <h2 className="black-1 fw-bold">Novedades</h2>
                <Carousel id="home-carousel">
                    {[...Array(2)].map((_, i) => (
                        <Carousel.Item key={i}>
                            <div className='home-container-cards d-flex justify-content-center align-items-center'>
                                {[...Array(3)].map((_, j) => {
                                    const product = products[i*3 + j];
                                    return product ? (
                                        <Card key={product.id} product={product} isHome={true} />
                                    ) : (
                                        <div key={i*3 + j} className="card-placeholder">No Product</div>
                                    );
                                })}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Link to="/Products" className="button-1 black-1 mb-4 mt-3" onClick={() => window.scrollTo(0, 0)}>Ver catálogo</Link>
            </main>
            <section id="home-quienes-somos" className="background-white-1 d-flex justify-content-center align-items-center cursor-default">
                <div id="home-background-1" className="w-50 h-100"></div>
                <div className="w-50 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="black-1 fw-bold">¿Quiénes somos?</h2>
                    <p>Desde 1967 nos dedicamos a preservar la magia atemporal de la música a través de uno de los formatos más queridos y auténticos: el vinilo. Con una pasión arraigada por el sonido analógico y la nostalgia de las portadas artísticas, ofrecemos una cuidadosa selección de álbumes que abarcan géneros, décadas y emociones.</p>
                </div>
            </section>
            <section id="home-contacto" className="background-color-0 d-flex flex-column justify-content-center align-items-center">
                <h2 className="black-1 fw-bold cursor-default">Contacto</h2>
                <div id="contacto-container" className="background-color-1 d-flex justify-content-center align-items-center p-5">
                    <div className="d-flex justify-content-center align-items-center">
                        <div>
                            <iframe id="home-map" title="i-frame" src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=Joaquín V. González 1125 CABA&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-end align-items-start ms-5 h-100 cursor-default">
                        <p>contacto@spincity.com</p>
                        <p>Joaquín V. González 1125 CABA</p>
                        <p>4862-9345</p>
                    </div>
                </div>
            </section>
            <div className="footer-padding background-color-0"></div>
            <Footer />
        </div>
    );
}

export default Home;
