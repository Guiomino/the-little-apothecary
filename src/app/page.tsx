"use client"

import Image from "next/image";
import styles from "./page.module.scss";
import IngredientProvider from "./context/IngredientContext";
import Market from "./components/market/Market";
import IngredientList from "./components/IngredientList";
import { useState } from "react";
import OpenModalButton from "./miscellaneous/openModalButton";

export default function Home() {

  const [isdisplayed, setIsDisplayed] = useState(false);
  const modalButtonHandler = () => setIsDisplayed(!isdisplayed);
  const modalCloseHandler = () => setIsDisplayed(false);

  return (
    <>
      <IngredientProvider>
        <main className={styles.mainPage}>
          <h1>The Little Apothecary</h1>
          <OpenModalButton onClick={modalButtonHandler} />
          {
            isdisplayed && (
              <>
              <Market onCloseClick={modalCloseHandler} />
          <IngredientList />
              </>
            )
          }
          
        </main>
      </IngredientProvider>
    </>
  );
}
