import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice.js';
import { lessCartItemQuantity, addItemToCart, removeItemFromCart } from '../redux/accountsSlice.js';
import { imageMap } from '../assets/imports.js';

function ProductList({ product }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.accounts.currentUser);
  const [quantity, setQuantity] = useState(currentUser.cart[product.id] || 0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLessQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      dispatch(lessCartItemQuantity(product.id));
    }
  };

  const handleMoreQuantity = () => {
    if (quantity < 10) {
      setQuantity(prevQuantity => prevQuantity + 1);
      dispatch(addItemToCart(product.id));
    }
  };

  return (
    <div className="product-list background-gray">
      <div className="first-col">
        <img src={imageMap[product.image]} alt={"remera de " + product.name } />
        <div className='inner-vertical'>
          <span className='show-on-vertical'>Artículo:</span>
          <div className='inner-first-col'>
            <h4>{product.title}</h4>
            <h5>{product.subtitle}</h5>
          </div>
        </div>
      </div>
      <div className='second-col'>
        <span className='show-on-vertical'>Precio:</span>
        <p>$ {product.price}</p>
      </div>
      <div className="second-col">
        <div className='inner-second-col'>
          <span className='show-on-vertical'>Cantidad:</span>
          <button className="product-less-more-button color-2" onClick={handleLessQuantity}>-</button>
          <p className='m-0'>{quantity}</p>
          <button className="product-less-more-button color-2" onClick={handleMoreQuantity}>+</button>
        </div>
      </div>
      <div className='delete-button'>
        <button id="user-delete-button" className="background-red-1 d-flex align-items-center justify-content-center m-2 px-3" onClick={() => dispatch(removeItemFromCart(product.id))}>Eliminar</button>
      </div>
    </div>
  );
}

export default ProductList;