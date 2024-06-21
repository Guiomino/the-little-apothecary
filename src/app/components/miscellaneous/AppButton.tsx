// AppButton.tsx

"use client"

import React from 'react';
import styles from "./miscellaneous.module.scss"
import AppButtonBranch from './AppButtonBranch';

interface AppButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean
}

const AppButton: React.FC<AppButtonProps> = ({ label, onClick , disabled}) => {
  return (
    <div className={styles.apothecaryBtnSet}>

      <div className={styles.topLeft}><AppButtonBranch /></div>
      <div className={styles.topRight}><AppButtonBranch /></div>
      <div className={styles.bottomRight}><AppButtonBranch /></div>
      <div className={styles.bottomLeft}><AppButtonBranch /></div>

      <button className={styles.apothecaryBtn} onClick={onClick}>{label}</button>
    </div>
  );
};

export default AppButton;
