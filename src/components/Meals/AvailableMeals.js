import Card from "../UI/Card";
import MealTab from "../UI/MealTab";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";


const AvailableMeals = (props) => {
  const [meals, setMeals]  = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState (null)


  //Get the meals from Firebase
  // Firebase will return an object, so we have to iterate it to get the data
  // using function fetchMeals because we can not use async function directly with useEffect
  
  useEffect( ()=>{
    const fetchMeals = async () =>{
      const response = await fetch('https://food-order-app-7d66e-default-rtdb.europe-west1.firebasedatabase.app/meals.json')

      if (!response.ok){
        throw new Error ('Failed to fetch meals from the database server.')
      }

      const responseData = await response.json()

      const loadedMeals = []

      for (const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          category: responseData[key].category
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }
    fetchMeals().catch( (error) => {
      setIsLoading(false)
      setHttpError(error.message)
    }
    )
  },[])


    const categoryMeals = meals.filter((item) => {
    return item.category === props.mealCategory;
  });

  if(isLoading){
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError){
    return (
      <section className={classes.httpError}>
        <p>{httpError}</p>
      </section>
    )
  }
  console.log(categoryMeals);
  const mealsList = categoryMeals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));


  return (
    <section className={classes.meal}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
