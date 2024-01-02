import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import {db} from '../DB/firebase' 
import { ref, push, set } from 'firebase/database';
import { NavLink } from "react-router-dom";



const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isPermissionError, setIsPermissionError] = useState(false)
  const [isSubmissionError, setIsSubmissionError] = useState (false)

  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}лв.`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    try {
      // Create a reference to the 'orders' node in the Firebase database
      const ordersRef = ref(db, 'orders');

      // Generate a new unique key for the order
      const newOrderRef = push(ordersRef);

      // Create the order data object
      const orderData = {
        user: userData,
        orderedItems: cartCtx.items,
      };

      // Set the new order data at the generated key
      await set(newOrderRef, orderData);

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      if (error.message.includes('permission denied')){
        setIsPermissionError(true)
        console.log("Permission error")
      }else{
        setIsSubmissionError (true)
        console.log("Not Permission error")

      }
      console.error("Грешка при изпращане на поръчката:", error);
      setIsSubmitting(false);
    }
  };


  const cartItems = (
    <ul
      className={`${
        isCheckout ? classes["cart-items-small"] : classes["cart-items"]
      } `}
    >
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
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Затвори
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Поръчай
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Общо</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Изпращане на данните за поръчката...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Поръчката е изпратена успешно!</p>
      <div className={classes.actions}>
        <button className={classes["button-"]} onClick={props.onClose}>
          Затвори
        </button>
      </div>
    </React.Fragment>
  );

  const permissionErrorModalContent = (
    <React.Fragment>
      <p>Упс! Изглежда не сте регистриран. Моля регистрирайте се, за да направите поръчка!</p>
      <div className={classes.actions}>
        <button className={classes["button-"]} onClick={props.onClose}>
          Затвори
        </button>
      </div>
      <p className="text-sm text-white text-center">
         <NavLink to="/signup">Създай акаунт</NavLink>
        </p>
    </React.Fragment>
  );

  const submissionErrorModalContent = (
    <React.Fragment>
      <p>Нещо се обърка!</p>
      <div className={classes.actions}>
        <button className={classes["button-"]} onClick={props.onClose}>
          Затвори
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !isPermissionError && !isSubmissionError && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting & !didSubmit && isPermissionError && permissionErrorModalContent}
      {!isSubmitting & !didSubmit && !isPermissionError && isSubmissionError && submissionErrorModalContent }
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
