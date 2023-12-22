import React, { useRef, useState } from "react";
import styles from "./MealItemForm.module.css"
import Input from "../../UI/Input";
const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNo = +enteredAmount;
        if (enteredAmount.trim().length === 0 ||
            enteredAmountNo < 1 ||
            enteredAmountNo > 5
        ) {
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNo);
    }

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef}
            label="Amount"
            input={{
                id: "amount" + props.id,
                type: "number",
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}
        />
        {!amountIsValid && <p>Please Entered a Valid Amount.</p>}
        <button>+ Add</button>
    </form>
}

export default MealItemForm;