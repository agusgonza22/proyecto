import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/accountsSlice';
import { imageMap } from '../assets/imports.js';

function Card({ product, isHome }) {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.accounts.currentUser);
    const [quantity, setQuantity] = useState(currentUser && currentUser.cart ? currentUser.cart[product.id] || 0 : 0);

    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = () => {
        if (quantity < 10) {
            setQuantity(prevQuantity => prevQuantity + 1);
            dispatch(addItemToCart(product.id));
        }
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    if (!product) { return <div>Loading...</div>; }

    return (
        <div className="card">
            <img src={imageMap[product.image]} alt={product.title} />
            <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <h3 className="card-subtitle">{product.subtitle}</h3>
                {!isHome && (
                    <div className='d-flex'>
                    <p className="card-price">$ {product.price}</p>
                    <button id="add-cart-button" className="card-button bi bi-bag-fill mb-1" onClick={handleAddToCart}></button>
                </div>
                )}
            </div>
            {showPopup && (
                <div className="popup">
                    <p>Agregado al carrito</p>
                </div>
            )}
        </div>
    );
}

export default Card;

