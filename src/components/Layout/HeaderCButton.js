import React, {useContext, useEffect, useState} from "react";
import CartIcon from "../../assets/cart.svg"
import styles from "./HeaderCButton.module.css"
import CartContext from "../../store/cart-context";

const HeaderCButton = props => {
    const [btnIsHighlighted,setBtnIsHignlighted] = useState(false);
    const cartCtx = useContext(CartContext)
    
    
    const noOFCartItem = cartCtx.items.reduce((current,item)=>{
        return current + item.amount 
    },0) 
    

    const btnStyle = `${styles.button} ${btnIsHighlighted ? styles.bump: ''}`

    useEffect(()=>{
        if(cartCtx.items.length === 0){
            return;
        }
        setBtnIsHignlighted(true)
        const timer = setTimeout(() =>{
            setBtnIsHignlighted(false)
        }, 300)

        return () =>{
            clearTimeout(timer)
        }
    }, [cartCtx.items])

    return (
        <button className={btnStyle} onClick={props.onClick}>
            <img className={styles.icon} src={CartIcon} alt="cart icon" />
            <span>Your Cart</span>
            <span className={styles.badge}>
                {noOFCartItem }
            </span>
        </button>
    )
}

export default HeaderCButton;