// Cabinet.tsx

"use client"

import React, { useState } from "react";
import { useIngredients } from "../../context/IngredientContext";
import styles from "./cabinet.module.scss";
import CabinetModal from "./CabinetModal";

interface ApothecaryCabinetProps { }

const ApothecaryCabinetComponent: React.FC<ApothecaryCabinetProps> = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const ingredients = useIngredients();

    const openCabinetModal = (type: string) => {
        setSelectedType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedType(null);
    };

    return (
        <div className={styles.apothecaryContainer}>
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

            {modalOpen && selectedType && (
                <CabinetModal
                    ingredients={ingredients.filter(ingredient => ingredient.type === selectedType)}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ApothecaryCabinetComponent;
