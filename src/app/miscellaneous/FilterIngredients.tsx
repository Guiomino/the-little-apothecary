// FilterIngredients.tsx

"use client"

import React from 'react';
import styles from "@/app/miscellaneous/miscellaneous.module.scss"

const FilterIngredients: React.FC = () => {
  return (
    <button className={styles.filterButton}>Filter</button>
  );
};

export default FilterIngredients;
