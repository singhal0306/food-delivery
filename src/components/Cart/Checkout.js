import React, { useRef, useState } from 'react';
import styles from "./Checkout.module.css"

const isEmpty = value => value.trim() === '';
const isSixChar = value => value.trim().length === 6;

export default function Checkout(props) {
    const [inputsValidity, setInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })
    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const submitHandler = (event) => {

        event.preventDefault();
        const name = nameRef.current.value;
        const street = streetRef.current.value;
        const postalCode = postalRef.current.value;
        const city = cityRef.current.value;

        const validName = !isEmpty(name)
        const validStreet = !isEmpty(street);
        const validPostal = isSixChar(postalCode);
        const validCity = !isEmpty(city);

        setInputsValidity({
            name: validName,
            street: validStreet,
            city: validCity,
            postalCode: validPostal
        })

        const formIsValid = validName && validCity && validPostal && validStreet;

        if (!formIsValid) {
            return;
        }

        props.onConfirm(
            { name, street, city, postalCode }
        )

    }
    return (
        <form onSubmit={submitHandler}>
            <div className={`${styles.control} ${inputsValidity.name ? '' : styles.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id='name' ref={nameRef} />
                {!inputsValidity.name && <p>Please enter a valid Name!</p>}
            </div>
            <div className={`${styles.control} ${inputsValidity.street ? '' : styles.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id='street' ref={streetRef} />
                {!inputsValidity.street && <p>Please enter a valid Street!</p>}
            </div>
            <div className={`${styles.control} ${inputsValidity.postalCode ? '' : styles.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id='postal' ref={postalRef} />
                {!inputsValidity.postalCode && <p>Please enter a valid Postal Code!</p>}
            </div>
            <div className={`${styles.control} ${inputsValidity.city ? '' : styles.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id='city' ref={cityRef} />
                {!inputsValidity.city && <p>Please enter a valid City!</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    )
}
