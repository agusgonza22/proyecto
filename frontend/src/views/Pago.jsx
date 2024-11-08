import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { emptyCart } from '../redux/accountsSlice.js';

import mPago from '../assets/img/mercado-pago-logo-1.png';
import visaMaster from '../assets/img/visa-master-logo.png';
import master from '../assets/img/master-logo.png';
import visa from '../assets/img/visa-logo.png';

const Pago = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.accounts.currentUser);
    const products = useSelector(state => state.products.products);

    const [discountedPrice, setDiscountedPrice] = useState(0);
    const count = currentUser && currentUser.cart ? Object.values(currentUser.cart).reduce((total, quantity) => total + quantity, 0) : 0;

    const navigate = useNavigate();

    const [tarjetaView, setTarjetaView] = useState(false);
    const [comprado, setComprado] = useState(false);
    const [colorMaster, setColorMaster] = useState("background-white-1");
    const [colorVisa, setColorVisa] = useState("background-white-1");
    const [buttonFinalizar, setButtonFinalizar] = useState("button-pago-blocked");
    const [datosTarjeta, setDatosTarjeta] = useState({
        numero: '',
        titular: '',
        vtoMes: '',
        vtoYear: '',
        codigoSeguridad: ''
    });

    useEffect(() => {
        const totalPrice = Object.entries(currentUser.cart).reduce((total, [itemId, quantity]) => {
            const product = products.find(product => product.id === parseInt(itemId));
            if (product) {
                return total + (product.price * quantity);
            }
            return total;
        }, 0);

        let newDiscountedPrice = totalPrice;
        if (currentUser.discount === 1) { newDiscountedPrice += 15; }
        else if (currentUser.discount === 2) { newDiscountedPrice *= 0.9; }
        else if (currentUser.discount === 3) { newDiscountedPrice = newDiscountedPrice * 0.9 + 15; }
        setDiscountedPrice(newDiscountedPrice);
    }, [currentUser, products]);

    useEffect(() => {
        const { numero, titular, vtoMes, vtoYear, codigoSeguridad } = datosTarjeta;
        if (numero && titular && vtoMes && vtoYear && codigoSeguridad && (colorVisa !== "background-white-1" || colorMaster !== "background-white-1")) {
            setButtonFinalizar("button-pago");
        } else {
            setButtonFinalizar("button-pago-blocked");
        }
    }, [datosTarjeta]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosTarjeta(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const comprar = () => {
        if (buttonFinalizar === "button-pago") {
            setComprado('si');
            setTarjetaView(false);
            dispatch(emptyCart());
        }
    }

    const cambiarColor = (tarjeta) => {
        switch (tarjeta) {
            case "visa":
                setColorMaster("background-white-1");
                setColorVisa("background-color-2");
                break;
            case "master":
                setColorMaster("background-color-2");
                setColorVisa("background-white-1");
                break;
            default:
                break;
        }
    };

    const atras = () => {
        if (tarjetaView) {
            setTarjetaView(false);
        } else {
            navigate('/cart');
        }
    }

    const renderTarjeta = () => {
        switch (tarjetaView) {
            case false:
                return(
                    <div id="pago-metodos" className="d-flex flex-column h-100 background-color-1">
                        <h3>Métodos de pago:</h3>
                        <button id="button-pago-1" className="metodo-pago-button d-flex justify-content-between align-items-center background-blue-1">
                            <h4 className="black-1 m-0 p-4">Mercado pago</h4>
                            <img id="img-mp" className="px-4" src={mPago} alt="mp" />
                        </button>
                        <button id="button-pago-2" className="metodo-pago-button d-flex justify-content-between align-items-center background-gold-1" onClick={() => setTarjetaView('si :)')}>
                            <h4 className="black-1 m-0 p-4">Tarjeta de crédito</h4>
                            <img id="img-mp" className="px-4" src={visaMaster} alt="visa-master" />
                        </button>
                        <button id="button-pago-3" className="metodo-pago-button d-flex justify-content-between align-items-center background-brown-1" onClick={() => setTarjetaView('si :)')}>
                            <h4 className="black-1 m-0 p-4">Tarjeta de débito</h4>
                            <img id="img-mp" className="px-4" src={visaMaster} alt="visa-master" />
                        </button>
                    </div>
                );
            default:
                return(
                    <div id="pago-metodos" className="d-flex flex-column h-100 background-color-1">
                        <h3>Datos de la tarjeta</h3>
                        <div className="d-flex">
                            <button id="button-visa" className={`${colorVisa} button-tarjeta-img`} onClick={() => cambiarColor('visa')}>
                                <img className="tarjeta-img-pago" src={visa} alt="visa" />
                            </button>
                            <button id="button-master" className={`${colorMaster} button-tarjeta-img`} onClick={() => cambiarColor('master')}>
                                <img className="tarjeta-img-pago" src={master} alt="master" />
                            </button>
                        </div>
                        <ul>
                        <li className="d-flex flex-column mt-3"><h4 className="my-1 ms-1">Número de Tarjeta:</h4><input id="input-tarjeta" name="numero" type="text" value={datosTarjeta.numero} onChange={handleInputChange} /></li>
                            <li className="d-flex flex-column mt-3"><h4 className="my-1 ms-1">Titular:</h4><input id="input-tarjeta" name="titular" type="text" value={datosTarjeta.titular} onChange={handleInputChange} /></li>
                            <li className="d-flex flex-column mt-2">
                                <h4 className="mb-1 mt-3 ms-1">Vencimiento:</h4>
                                <div className="d-flex">
                                    <h5 className="mt-1 ms-1 me-2 fst-italic">Mes</h5>
                                    <input id="input-vto-mes" name="vtoMes" type="text" value={datosTarjeta.vtoMes} onChange={handleInputChange} />
                                    <h5 className="mt-1 ms-3 me-2 fst-italic">Año</h5>
                                    <input id="input-vto-year" name="vtoYear" type="text" value={datosTarjeta.vtoYear} onChange={handleInputChange} />
                                </div>
                            </li>
                            <li className="d-flex flex-column mt-3"><h4 className="my-2 ms-1">Código de seguridad:</h4><input id="input-vto-year" name="codigoSeguridad" type="text" value={datosTarjeta.codigoSeguridad} onChange={handleInputChange} /></li>
                        </ul>
                    </div>
                );
        }
    }
    switch (comprado) {
        case "no":
            return (
                <div id="pago" className="d-flex flex-column justify-content-center align-items-center background-color-0">
                    <div className="padding-nav"></div>
                    <div id="container-pago" className="d-flex">
                        {renderTarjeta()}
                        <div id="pago-total" className="d-flex flex-column align-items-start justify-content-end background-color-2">
                            <h5 className="ps-5">Número de articulos: {count}</h5>
                            <h3 className="ps-5 pb-3">Total: $ {Math.ceil(discountedPrice)}.00</h3>
                            <div className="d-flex ps-5 pb-5">
                                <button className={buttonFinalizar} onClick={() => comprar()}>Finalizar compra</button>
                                <button className="button-pago" onClick={() => atras()}>Atrás</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        default:
            return(
                <div id="pago" className="d-flex flex-column justify-content-center align-items-center background-color-0">
                    <div className="padding-nav"></div>
                    <h2 className="color-3">Tu compra ha sido realizada con éxito!</h2>
                    <button className="button-pago mt-5" onClick={() => navigate('/cart')}>Volver</button>
                </div>
            )
        }
}

export default Pago;