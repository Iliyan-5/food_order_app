import Card from "../UI/Card";
import MealTab from "../UI/MealTab";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useState } from "react";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
    category: "Starters",
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
    category: "Main",
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
    category: "Main",
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
    category: "Salads",
  },
];

const AvailableMeals = (props) => {
    console.log("---"+props)
  const categoryMeals = DUMMY_MEALS.filter((item) => {
    console.log("item " + item.category)
    console.log("props " + props.mealCategory)
    return item.category === props.mealCategory;
  });
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
