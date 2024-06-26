// FilterIngredients.tsx

"use client"

import React from 'react';
import styles from "./miscellaneous.module.scss"
import Image from 'next/image';

interface FilterIngredientsProps {
  onFilterClick: () => void;
};

const FilterIngredients: React.FC<FilterIngredientsProps> = ({ onFilterClick }) => {
  return (
    <button onClick={onFilterClick} className={styles.filterButton}>
      <Image src={"/images/Miscellaneous/Filter.png"} width={22} height={22} alt='Filter' />
    </button>
  );
};

export default FilterIngredients;
