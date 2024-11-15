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
        <div className='central'>
            <section id="home-banner" className="d-flex justify-content-center align-items-center">
                {/* <div className="padding-nav"></div> */}
                <h2 className="shadow-lg color-0 padding-nav-title cursor-default titulo-principal fw-bold text-center">Explora Nuestra Selección de Camisetas</h2>
            </section>
            <main id="home-novedades" className="background-color-0 d-flex flex-column justify-content-center align-items-center cursor-default">
                <h3 className="black-1 fw-bold f-56" >Novedades</h3>
                <Carousel id="home-carousel" >
                    {[...Array(2)].map((_, i) => (
                        <Carousel.Item key={i}>
                                <div className='home-container-cards d-flex justify-content-center align-items-center flex-wrap'>
                                    {[...Array(3)].map((_, j) => {
                                    const product = products[i * 3 + j];
                                    return product ? (
                                        <Card key={product.id} product={product} isHome={true} />
                                    ) : (
                                        <div key={i * 3 + j} className="card-placeholder">No Product</div>
                                    );
                                    })}
                                </div>
                         </Carousel.Item>
                    ))}
                </Carousel>

                <Link to="/Products" className="button-1 color-0 mb-4 mt-3" onClick={() => window.scrollTo(0, 0)}>Ver catálogo</Link>
            </main>
            <section  className=" container-fluid  background-color-1">
               <div className="row quienes-somos">
                        <div className="home-background col-12 col-sm-6">
                        </div>
                        <div className=" col-12 col-sm-6 p-4  d-flex flex-column justify-content-center align-items-center text-white">
                            <h3 className="fw-bold f-46 text-center">¿Quiénes somos?</h3>
                            <p className="lora-font text-center">
                                Desde nuestros inicios, nos hemos dedicado a celebrar la pasión y el legado del fútbol a través de camisetas que representan a los equipos y jugadores más emblemáticos de todos los tiempos. Creemos en el poder de una camiseta para contar historias y transmitir orgullo, ya sea en el estadio o en la vida cotidiana. Nuestra selección cuidadosamente curada abarca estilos, épocas y colores, capturando la esencia del deporte rey en cada prenda.
                            </p>
                        </div>
               </div>
            </section>
            <section id="home-contacto" className="background-color-0 mt-5 mb-5">
                <h3 className="black-1 fw-bold cursor-default f-56 text-center">Contacto</h3>
                <div className="contacto background-color-2 p-4 ">
                    <div className="map-container">
                        <iframe
                            id="home-map"
                            title="i-frame"
                            src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=Nicaragua%205099%20CABA&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        
                        ></iframe>
                    </div>
                    <div className="contacto-datos color-3">
                    <p>contacto@leyys.com</p>
                    <p>Nicaragua 5099 CABA</p>
                    <p>4202-2401</p>
                    </div>
                </div>
            </section>
            
            <Footer/>
        </div>
    );
}

export default Home;
