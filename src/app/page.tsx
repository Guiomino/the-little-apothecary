import Image from "next/image";
import styles from "./page.module.scss";
import IngredientProvider from "./context/IngredientContext";
import Market from "./components/market/Market";
import IngredientList from "./components/IngredientList";

export default function Home() {
  return (
    <>
      <IngredientProvider>
        <main className={styles.app}>
          <h1>The Little Apothecary</h1>
          <Market />
          <IngredientList />
        </main>
      </IngredientProvider>
    </>
  );
}
