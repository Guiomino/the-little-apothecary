// ApothecaryCabinet.tsx

"use client"

import React, { useEffect, useState } from "react";
import { useIngredients } from "../../context/IngredientContext";
import styles from "./apothecaryCabinet.module.scss";
import CabinetModal from "./CabinetModal";
import Candles from "../miscellaneous/Candles";

interface ApothecaryCabinetProps {
    onOpenModal: (type: string, ingredients: any[]) => void;
}

const ApothecaryCabinet: React.FC<ApothecaryCabinetProps> = ({ onOpenModal }) => {
    const [storedIngredients, setStoredIngredients] = useState<any[]>([]);
    const ingredients = useIngredients();

    const loadFromLocalStorage = (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : [];
    };

    useEffect(() => {
        const storedItems = loadFromLocalStorage("UserIngredientStock");
        setStoredIngredients(storedItems);
    }, []);

    const openCabinetModal = (type: string) => {
        const filteredIngredients = storedIngredients.filter(
            (ingredient) => ingredient.ingredient.type === type
        );
        onOpenModal(type, filteredIngredients);
    };

    return (
        <div className={styles.apothecaryContainer}>

            <div className={styles.candles}>
            <div className={styles.candle1}><Candles /></div>
            <div className={styles.candle2}><Candles /></div>
            <div className={styles.candle3}><Candles /></div>
            <div className={styles.candle4}><Candles /></div>
            <div className={styles.candle5}><Candles /></div>
            </div>

            <div className={styles.apothecaryTable}></div>

            <div className={styles.apothecaryCabinet}>
                <div className={styles.legLeft}></div>
                <div className={styles.legRight}></div>

                <div className={styles.apothecaryStorage}>
                    <button
                        className={styles.mineral}
                        onClick={() => openCabinetModal("Mineral")}
                    >
                        <div className={styles.drawer}>
                            <div className={styles.label}>Mineral</div>
                            <div className={styles.handle}></div>
                        </div>
                    </button>

                    <button
                        className={styles.vegetal}
                        onClick={() => openCabinetModal("Vegetal")}
                    >
                        <div className={styles.drawer}>
                            <div className={styles.label}>Vegetal</div>
                            <div className={styles.handle}></div>
                        </div>
                    </button>

                    <button
                        className={styles.animal}
                        onClick={() => openCabinetModal("Animal")}
                    >
                        <div className={styles.drawer}>
                            <div className={styles.label}>Animal</div>
                            <div className={styles.handle}></div>
                        </div>
                    </button>

                    <button
                        className={styles.mushroom}
                        onClick={() => openCabinetModal("Mushroom")}
                    >
                        <div className={styles.drawer}>
                            <div className={styles.label}>Mushroom</div>
                            <div className={styles.handle}></div>
                        </div>
                    </button>

                </div>
            </div>
            <div className={styles.feet}></div>
        </div>
    );
};

export default ApothecaryCabinet;
