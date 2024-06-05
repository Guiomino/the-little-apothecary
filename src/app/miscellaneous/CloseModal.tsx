// CloseModal.tsx

"use client"

import React from 'react';
import styles from "@/app/miscellaneous/miscellaneous.module.scss"

const CloseModal: React.FC = () => {
  const handleClose = () => {
    // logic to close modal
  };

  return (
    <button className={styles.closeButton} onClick={handleClose}>Close</button>
  );
};

export default CloseModal;
