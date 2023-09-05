import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/actions/productActions';
import classes from './AvailableMeal.module.css'
import MealItem from './MealItem';
import Card from '../UI/Card';

const AvailableMeal = () => {
   
    const productState = useSelector((state)=>state.product)
    const {items} = productState
   
  

    const dispatch = useDispatch();


useEffect(()=>{

  dispatch(getProducts())

},[])

 if(productState.loading){
    return(
        <section className={classes.MealsLoading}>
            <h1>Loading Data..</h1>
        </section>
    )
 }

 if(productState.error){
    return(
        <section className={classes.MealsError}>
          <h1>Unable to Fetch Api Data...</h1>
        </section>
    )
 }
  
 console.log(items);
 const mealsList = Object.keys(items).map((key) => {
    const meal = items[key];
    return (
      <MealItem
        key={key}
        id={key} // Use the key as the ID if needed
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });



  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeal