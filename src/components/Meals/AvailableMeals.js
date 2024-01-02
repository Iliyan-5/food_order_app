import Card from "../UI/Card";
import MealTab from "./MealTab";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import { useEffect, useState } from "react";
import { db } from '../DB/firebase'; 
import {ref, get} from 'firebase/database'

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealRef = ref(db, 'meals'); 
        const snapshot = await get(mealRef); 

        if (snapshot.exists()) {
          const responseData = snapshot.val();
          const loadedMeals = [];

          for (const key in responseData) {
            loadedMeals.push({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price,
              category: responseData[key].category,
            });
          }

          setMeals(loadedMeals);
        } else {
          console.log('Няма намерени продукти');
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    fetchMeals();
  }, []);

  const categoryMeals = meals.filter((item) => {
    return item.category === props.mealCategory;
  });

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Зареждане...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.httpError}>
        <p>{httpError}</p>
      </section>
    );
  }

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
