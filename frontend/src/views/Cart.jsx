import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { updateDiscount } from '../redux/accountsSlice.js';
import { Link } from 'react-router-dom';
import ProductList from "../components/ProductList.jsx";
import Footer from '../components/Footer.jsx';

const Cart = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.accounts.currentUser);
    const products = useSelector(state => state.products.products);
    const currentUserWithDefault = currentUser || { cart: {} };

    const [seleccionEnvio, setEnvio] = useState('Seleccionar');
    const [codigoDescuento, setCodigoDescuento] = useState('');
    const [isCod10Off, setIsCod10Off] = useState(false);
    const [retiro, setRetiro] = useState(true);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    const count = currentUserWithDefault && currentUserWithDefault.cart ? Object.values(currentUserWithDefault.cart).reduce((total, quantity) => total + quantity, 0) : 0;

    useEffect(() => {
        const totalPrice = currentUserWithDefault && currentUserWithDefault.cart ? Object.entries(currentUserWithDefault.cart).reduce((total, [itemId, quantity]) => {
            const product = products.find(product => product.id === parseInt(itemId));
            if (product) {
                return total + (product.price * quantity);
            }
            return total;
        }, 0) : 0;

        let newDiscountedPrice = totalPrice;
        if (currentUserWithDefault.discount === 1) { newDiscountedPrice += 15; }
        else if (currentUserWithDefault.discount === 2) { newDiscountedPrice *= 0.9; }
        else if (currentUserWithDefault.discount === 3) { newDiscountedPrice = newDiscountedPrice * 0.9 + 15; }
        setDiscountedPrice(newDiscountedPrice);
    }, [currentUserWithDefault, products]);

    useEffect(() => {
        let newDiscount = 0;
        if (!isCod10Off && retiro) { newDiscount = 0; }
        else if (!isCod10Off && !retiro) { newDiscount = 1; }
        else if (isCod10Off && retiro) { newDiscount = 2; }
        else if (isCod10Off && !retiro) { newDiscount = 3; }
        if (currentUser !== null) { dispatch(updateDiscount(newDiscount)); }
    }, [isCod10Off, retiro]);

    const handleDiscountInputChange = (event) => {
        const value = event.target.value.toLowerCase();
        setIsCod10Off(value.includes('cod10off') || value.includes('promociona'));
        setCodigoDescuento(value);
    };

    const handleEnvioSelectChange = (event) => {
        setRetiro(event.target.value === 'retiro');
        setEnvio(event.target.value);
    };

    const renderPago = () => {
        if (count === 0) {
            return (
                <div className="d-flex flex-column align-items-center pb-5">
                    <h2 className="color-1 m-5 pb-5">No hay productos en el carrito</h2>
                    <div className="p-4"></div>
                </div>
            );
        } else {
            return(
                <div className='cart-checkout d-flex'>
                    <div className="cart-envio">
                        <h3 className="text-center pb-2 cursor-default">Tipo de envío:</h3>
                        <select value={seleccionEnvio} onChange={handleEnvioSelectChange}>
                            <option value="retiro">Retiro en Sucursal</option>
                            <option value="envio">Envío a domicilio (+15$)</option>
                            <option value="seleccionarEnvio">Seleccionar envío...</option>
                        </select>
                    </div>
                    <div className="cart-descuento">
                        <h3 className="text-center pb-2 cursor-default">Código de descuento:</h3>
                        <input type="text" placeholder="Código de descuento" onChange={handleDiscountInputChange} value={codigoDescuento}/>
                    </div>
                    <div className="cart-total d-flex flex-column">
                    { isCod10Off && ( <h5 id="diezoff-h5">Descuento: - 10%</h5> )}
                        <p>Total: ${Math.ceil(discountedPrice)}</p>
                    </div>
                    <div className="cart-finalizar">
                        <Link to="/payment" id="cart-finalizar-button">Comprar</Link>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className='cart d-flex flex-column align-items-center'>
            <section id="cart-banner" className="d-flex justify-content-center align-items-center">
                <h2 className="white-1 padding-nav-title cursor-default fw-bold fs-56">Carrito</h2>
            </section>
            <div className='cart-items'>
                <div className="product-list-header d-flex align-items-center fw-bold ps-2">
                    <span id="cart-padding-titulo" className="cursor-default ps-2">Artículo</span>
                    <span></span>
                    <span id="cart-padding-precio" className="cursor-default">Precio</span>
                    <span id="cart-padding-precio" className="cursor-default">Cantidad</span>
                    <span></span>
                </div>
                <div>
                    {Object.keys(currentUserWithDefault.cart).map(productId => (
                        <ProductList key={productId} product={products[parseInt(productId) - 1]} />
                    ))}
                </div>
            </div>
            {renderPago()}
            <Footer />
        </div>
    );
}

export default Cart;
