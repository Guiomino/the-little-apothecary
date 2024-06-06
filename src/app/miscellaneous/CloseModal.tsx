// CloseModal.tsx

"use client"

import React from 'react';
import styles from "@/app/miscellaneous/miscellaneous.module.scss"

interface OpenModalButtonProps {
  label?: string;
  onClick: () => void;
}

const CloseModal: React.FC<OpenModalButtonProps> = ({onClick, label}) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>{label}X</button>
  );
};

export default CloseModal;
