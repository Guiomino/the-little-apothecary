// page.tsx

"use client"

import styles from "./page.module.scss";
import IngredientProvider from "./context/IngredientContext";
import Market from "./components/market/Market";
import { useState } from "react";
import OpenModalButton from "@/app/components/miscellaneous/OpenModalButton";
import ApothecaryCabinet from "./components/cabinet/ApothecaryCabinet";
import CabinetModal from "./components/cabinet/CabinetModal";
import { Ingredient } from "./components/cabinet/CabinetModal";

export default function Home() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  
  const modalOpenHandler = () => setIsDisplayed(!isDisplayed);
  const modalCloseHandler = () => setIsDisplayed(false);

  const openCabinetModal = (type: string, ingredients: any[]) => {
    setSelectedIngredients(ingredients);
    setModalIsOpen(true);
  };

  const closeCabinetModal = () => {
    setSelectedIngredients([]);
    setModalIsOpen(false);
  };

  return (
    <>
      <IngredientProvider>
        <main className={styles.mainPage}>
          <h1>The Little Apothecary</h1>

          <div className={styles.OpenModalButton}>
            <OpenModalButton onClick={modalOpenHandler} label="🧺" />
          </div>

          {isDisplayed && (
            <>
              <Market onCloseClick={modalCloseHandler} />
            </>
          )}

          <div className={styles.apothecaryCabinet}>
            <ApothecaryCabinet onOpenModal={openCabinetModal} />
          </div>

          {modalIsOpen && (
            <>
              <CabinetModal
                ingredients={selectedIngredients}
                onCloseClick={closeCabinetModal}
              />
            </>
          )}
        </main>
      </IngredientProvider>
    </>
  );
}
