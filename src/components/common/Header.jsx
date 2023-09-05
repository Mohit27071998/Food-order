import React from 'react'
import mealImg from '../../assets/image.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <>
         <header className={classes.header}>
        <h1>Enjoy Delicious Meals</h1>
       { <HeaderCartButton onClick = {props.onShowCart}/> }
        </header>
        <div className={classes['main-image']}>
        <img src={mealImg} alt="Error" />
        </div>
    </>
  )
}

export default Header