import Image from "next/image";
import styles from "./page.module.scss";
import IngredientList from "./components/IngredientList";
import IngredientProvider from "./context/IngredientContext";

export default function Home() {
  return (
    <>
      <IngredientProvider>
        <main className={styles.app}>
          <h1>The Little Apothecary</h1>
          <IngredientList />
        </main>
      </IngredientProvider>
    </>
  );
}
