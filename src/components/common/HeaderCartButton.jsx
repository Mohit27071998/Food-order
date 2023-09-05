import React, { useEffect } from 'react'
import classes from './HeaderCartButton.module.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import CartIcon from '../cart/CartIcon'

const HeaderCartButton = (props) => {

    const[btnIsHighlighted,setBtnIsHighlighted] = useState(false)
    
    const cartCtx = useSelector((state) => state.cart)
    const{items} = cartCtx
   

    const numberOfCartItems = items.reduce((currNum, item) => {
      return currNum + item.quantity; 
    }, 0);
    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;


  useEffect(()=>{
    if(items.length === 0){
      return
    }
    setBtnIsHighlighted(true)

  const timer = setTimeout(() => {
    setBtnIsHighlighted(false)
  }, 300);
  

return()=>{
  clearTimeout(timer);
};

  },[items]);


  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton