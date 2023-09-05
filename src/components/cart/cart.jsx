import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import classes from './cart.module.css'

import Modal from '../UI/Modal'
import Checkout from './checkout';
import CartItem from './cartItem';
import { addItem, clearCart, removeItem } from '../../store/slices/cartSlice';

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

const dispatch = useDispatch();

    const cartCtx = useSelector((state)=>state.cart)
     

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    console.log(totalAmount);
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        dispatch(removeItem(id))
      };
    
      const cartItemAddHandler = (item) => {
        dispatch(addItem(item));
      };
    
 const orderHandler = () => {
    setIsCheckout(true);
  };




  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
  
    try {
      const response = await axios.post(
        'https://food-order-62410-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        {
          user: userData,
          orderedItems: cartCtx.items,
        }
      );
  
         console.log('Order submitted successfully:', response.data);
  
      setIsSubmitting(false);
      setDidSubmit(true);
       dispatch(clearCart())
    } catch (error) {
     
      console.error('Error submitting order:', error);
  
      setIsSubmitting(false);
      
    }
  };
  
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );


  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );


  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModalContent}
  </Modal>
  )
}

export default Cart