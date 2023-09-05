import React, { useState } from 'react'
import Header from './components/common/Header'
import Meals from './components/pages/Meals'
import Cart from './components/cart/cart'

const App = () => {

  const [showCart,setShowCart] = useState(false)

  const showCartHandler = () =>{
   setShowCart(true)
  }
 
  const hideCartHandler = () =>{
   setShowCart(false)
  }


  return (
    <div>
 {showCart && <Cart onClose = {hideCartHandler}/>}
      <Header  onShowCart = {showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </div>
  )
}

export default App