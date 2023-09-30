import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals'
import Cart from "./components/Cart/Cart";
import Contacts from "./components/Contacts/Contacts"; // Import your Contacts component
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  const showCartHandler = () => {
    setCartIsShown(true);
    setShowDropdown(false); // Close the dropdown when Cart is shown
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} onToggleDropdown={toggleDropdown} />
      {showDropdown && (
        <div className="dropdown-menu" font="white">
          <ul>
            <li>
              <button onClick={showCartHandler}>Menu</button>
            </li>
            <li>
              <button onClick={() => console.log("Contacts clicked")}>Contacts</button>
            </li>
          </ul>
        </div>
      )}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <main>
        <Meals />
      </main>
      {showDropdown && <div className="backdrop" onClick={toggleDropdown}></div>}
    </CartProvider>
  );
}

export default App;
