import React, { Fragment } from "react";
import { useState } from "react";
import Card from "./Card";


const MealTab = ({ tabs, defaultTab, onTabChange }) =>{

    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabClick = (tab) => {
      setActiveTab(tab);
      if (onTabChange) {
        onTabChange(tab);
      }
    };
  
    return (
        <Fragment>
      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${tab === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      </Fragment>
    );
  };
  

export default MealTab;