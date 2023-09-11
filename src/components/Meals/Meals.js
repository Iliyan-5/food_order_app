import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Fragment, useState } from "react";
import Card from "../UI/Card";
import classes from "./Meals.module.css";
import MealTab from "../UI/MealTab";
import '../UI/MealTab.css'


const Meals = () => {
    const [activeTab, setActiveTab] = useState('Starters');


    const handleTabChange = (tab) => {
        setActiveTab(tab);
       
      };
    

  return (
    <Fragment>
      <MealsSummary />
      <MealTab
          tabs={['Starters', 'Salads', 'Main', 'Desserts']}
          defaultTab="Main"
          onTabChange={handleTabChange}
        />
      <AvailableMeals mealCategory={activeTab}/>
    </Fragment>
  );
};
export default Meals;
