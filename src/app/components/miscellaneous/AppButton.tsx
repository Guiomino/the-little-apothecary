// AppButton.tsx

"use client"

import React from 'react';
import styles from "./miscellaneous.module.scss"

interface AppButtonProps {
  label: string;
  onClick: () => void;
}

const AppButton: React.FC<AppButtonProps> = ({ label, onClick }) => {
  return (
    <div className={styles.apothecaryBtnSet}>
      <button className={styles.apothecaryBtn} onClick={onClick}>{label}</button>
    </div>
  );
};

export default AppButton;
