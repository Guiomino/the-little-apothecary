// LevelUser.tsx

"use client"

import React from 'react';
import styles from "./miscellaneous.module.scss"

const LevelUser: React.FC = () => {
  return (
    <>
      <p className={styles.lvlSection}><strong>⬆ Lvl : </strong>1</p>
    </>
  );
};

export default LevelUser;
