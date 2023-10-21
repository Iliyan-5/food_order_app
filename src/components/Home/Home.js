import React, { useState } from "react";
import Header from "../Layout/Header";
import Meals from '../Meals/Meals'
import Cart from "../Cart/Cart";
import CartProvider from "../../store/CartProvider";
const Home = (props) => {
const [cartIsShown, setCartIsShown] = useState(false);

const showCartHandler = () => {
  setCartIsShown(true);
};

const hideCartHandler = () => {
  setCartIsShown(false);
};



return (
  <CartProvider>
    <Header onShowCart={showCartHandler} />
    {cartIsShown && <Cart onClose={hideCartHandler} />}
    <main>
      <Meals />
    </main>
  </CartProvider>
);
};

export default Home;