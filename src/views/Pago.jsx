import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../redux/accountsSlice.js';

const Pago = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleEmptyCart = () => {
        dispatch(emptyCart());
      };

    return(
        <div id="pago" className="d-flex flex-column justify-content-center align-items-center background-color-0">
            <div className="padding-nav"></div>
            <h2 className="color-2 fw-bold f-56">Tu compra ha sido realizada con éxito!</h2>
            <button className="button-1 mt-5" onClick={() => {handleEmptyCart(); navigate('/cart')} }>Volver</button>
        </div>
    )
}

export default Pago;