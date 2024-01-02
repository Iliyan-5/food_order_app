import React from "react";
import classes from './MealsSummary.module.css'

const MealsSummary = () => {
  return (
  <section className={classes.summary}>
    <h2>Любимата пицария на всички</h2>
    <p>
      Изберете любимата си пица
      и се насладете на вкусен обяд или вечеря у дома.
    </p>
    <p>
      Всички наши ястия се приготвят с висококачествени съставки, точно навреме и
      разбира се, от опитни готвачи!
    </p>
  </section>);
};

export default MealsSummary;
