import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Fragment, useState } from "react";
import MealTab from "./MealTab";
import './MealTab.css'


const Meals = () => {
    const [activeTab, setActiveTab] = useState('Стартери');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
      };
    
  return (
    <Fragment>
      <MealsSummary />
      <MealTab
          tabs={['Стартери', 'Салати', 'Пици', 'Десерти']}
          defaultTab="Стартери"
          onTabChange={handleTabChange}
        />
      <AvailableMeals mealCategory={activeTab}/>
    </Fragment>
  );
};
export default Meals;
