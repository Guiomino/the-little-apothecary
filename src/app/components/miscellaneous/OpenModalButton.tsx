// OpenModalButton.tsx

"use client"

import React from 'react';
import styles from "./miscellaneous.module.scss"

interface OpenModalButtonProps {
  label?: string;
  onClick: () => void;
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ label, onClick }) => {
  return (
    <button className={styles.openModalButton} onClick={onClick}>{label}</button>
  );
};

export default OpenModalButton;
