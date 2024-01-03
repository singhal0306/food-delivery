import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import styles from "./Cart.module.css"
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [toOrder, setToOrder] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setToOrder(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);

        await fetch('https://food-delivery-28101-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItem: cartCtx.items
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
    const cartItems = cartCtx.items.map(item => {
        return <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />
    });

    const cartModalContent = (<React.Fragment>
        <ul className={styles['cart-items']}>{cartItems}</ul>
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {toOrder &&
            <Checkout
                onCancel={props.onHideCart}
                onConfirm={submitOrderHandler}
            />
        }
        {!toOrder && <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>}
    </React.Fragment>)

    const whileSubmitting = (<p>Sending order data...</p>)
    const didSubmitted = (
        <React.Fragment>
            <p>Order Successful...</p>
            <div className={styles.actions}>
            <button className={styles.button} onClick={props.onHideCart}>Close</button>
        </div>
        </React.Fragment>
    )

    return <Modal onClick={props.onHideCart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && whileSubmitting}
        {!isSubmitting && didSubmit && didSubmitted}
    </Modal>
}
export default Cart;