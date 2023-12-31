import React from "react";
import styles from "./Header.module.css"
import mealsImage from "../../assets/meals.jpg"
import HeaderCButton from "./HeaderCButton";

const Header = (props) =>{
    return <React.Fragment>
        <header className={styles.header}>
            <h1>ReactMeals</h1>
            <HeaderCButton onClick = {props.onShowCart} />
        </header>
        <div className={styles['main-image']}>
            <img src={mealsImage} alt="A table full of delicious food!"/>
        </div>
    </React.Fragment>
}
export default Header;