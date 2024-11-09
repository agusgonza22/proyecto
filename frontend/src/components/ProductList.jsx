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
    <div className="product-list d-flex align-items-center justify-content-between background-gray w-100">
      <div className="d-flex align-items-center">
        <img src={imageMap[product.image]} alt="cover" />
        <div className="d-flex flex-column justify-content-center">
          <h4 className="product-column-1 my-0">{product.title}</h4>
          <h5 className="product-column-1 my-0">{product.subtitle}</h5>
        </div>
        <p className="product-column-2 my-0">$ {product.price}</p>
        <div className="d-flex align-items-center justify-content-center product-column-3">
          <button className="product-less-more-button color-2" onClick={handleLessQuantity}>-</button>
          <p className="my-0 mx-2">{quantity}</p>
          <button className="product-less-more-button color-2" onClick={handleMoreQuantity}>+</button>
        </div>
      </div>
      <button id="user-delete-button" className="background-red-1 d-flex align-items-center justify-content-center m-2 px-3" onClick={() => dispatch(removeItemFromCart(product.id))}>Eliminar</button>
    </div>
  );
}

export default ProductList;