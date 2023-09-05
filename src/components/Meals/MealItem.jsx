import React from 'react'
import classes from './MealItem.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import MealItemForm from './MealItemForm';



const MealItem = (props) => {
    
    const dispatch = useDispatch();
     const cartCtx = useSelector((state)=>state.cart.items)
    const price = `$${props.price.toFixed(2)}`;
   
     
const addToCartHandler = (amount)=>{
      dispatch(addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      }))
}

  return (
     <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id}   onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}

export default MealItem