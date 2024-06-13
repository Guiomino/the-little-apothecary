// pages.tsx

"use client"

import styles from "./page.module.scss";
import IngredientProvider from "./context/IngredientContext";
import Market from "./components/market/Market";
import { useState } from "react";
import OpenModalButton from "@/app/components/miscellaneous/OpenModalButton";

export default function Home() {

  const [isdisplayed, setIsDisplayed] = useState(false);
  const modalOpenHandler = () => setIsDisplayed(!isdisplayed);
  const modalCloseHandler = () => setIsDisplayed(false);

  return (
    <>
      <IngredientProvider>
        <main className={styles.mainPage}>
          <h1>The Little Apothecary</h1>
          <div className={styles.OpenModalButton}>
            <OpenModalButton onClick={modalOpenHandler} label="🧺" />
          </div>
          {
            isdisplayed && (
              <>
                <Market onCloseClick={modalCloseHandler} />
              </>
            )
          }

        </main>
      </IngredientProvider>
    </>
  );
}
