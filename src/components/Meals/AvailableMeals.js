import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';

const A1vailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch('https://food-delivery-28101-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      
      if(!response.ok){
        throw new Error("Something Went Wrong!")
      }  

      const data = await response.json();
      const meals = [];
      for (const key in data) {
        meals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setmeals(meals);
      setIsLoading(false);
    }
    fetchMeal().catch((error)=>{
      setIsLoading(false)
      setHttpError(error.message)
    });
    
  }, [])

  if(isLoading){
    return(
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  if(httpError){
    return(
      <section className={styles.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
  return <section className={styles.meals}>
    <Card>
      <ul>
        {meals.map((meal) => {
          return <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        })}
      </ul>
    </Card>
  </section>
}

export default A1vailableMeals;