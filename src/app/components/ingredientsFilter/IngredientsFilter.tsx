// IngredientsFilter.tsx

// "use client"

import React, { useState } from 'react'
import styles from "./ingredientsFilter.module.scss"
import Image from 'next/image';
import RangeSlider from './RangeSlider';

interface FilterProps {
    onClose: () => void;
    onTypeChange: (type: string | null) => void;
    onRarityChange: (rarity: string | null) => void;
    onReset: (rarity: string | null, type: string | null) => void;
};

const IngredientsFilter: React.FC<FilterProps> = ({ onClose, onTypeChange, onRarityChange, onReset }) => {

    const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleTypeClick = (type: string | null) => {
        setSelectedType(type);
        onTypeChange(type);
    };

    const handleRarityClick = (rarity: string | null) => {
        setSelectedRarity(rarity);
        onRarityChange(rarity);
    };

    return (
        <>
            <div className={styles.filter}>
                <div className={styles.top}>
                    <button className={styles.reset} onClick={() => onReset(null, null)}>Reset</button>
                    <h4>Filter</h4>
                    <button className={styles.close} onClick={onClose}>X</button>
                </div>

                <div className={styles.type}>
                    <h5>Type</h5>
                    <div>
                        <div className={styles.tooltip}>
                            <button className={selectedType === "Mineral" ? styles.typeActive : ""}
                                onClick={() => handleTypeClick("Mineral")}><Image src={"/images/Type/Type_Mineral.png"} width={20} height={20} alt='Mineral' /></button>
                            <div className={styles.tooltipText}>Mineral</div>
                        </div>
                        <div className={styles.tooltip}>
                            <button className={selectedType === "Vegetal" ? styles.typeActive : ""}
                                onClick={() => handleTypeClick("Vegetal")}><Image src={"/images/Type/Type_Vegetal.png"} width={20} height={20} alt='Vegetal' /></button>
                            <div className={styles.tooltipText}>Vegetal</div>
                        </div>
                        <div className={styles.tooltip}>
                            <button className={selectedType === "Animal" ? styles.typeActive : ""}
                                onClick={() => handleTypeClick("Animal")}><Image src={"/images/Type/Type_Animal.png"} width={20} height={20} alt='Animal' /></button>
                            <div className={styles.tooltipText}>Animal</div>
                        </div>
                        <div className={styles.tooltip}>
                            <button className={selectedType === "Mushroom" ? styles.typeActive : ""}
                                onClick={() => handleTypeClick("Mushroom")}><Image src={"/images/Type/Type_Mushroom.png"} width={20} height={20} alt='Mushroom' /></button>
                            <div className={styles.tooltipText}>Mushroom</div>
                        </div>
                    </div>
                </div>

                <div className={styles.line}></div>

                <div className={styles.rarity}>
                    <h5>Rarity</h5>
                    <div>
                        <div className={styles.tooltip}>
                            <button className={`${styles.common} ${selectedRarity === "Common" ? styles.rarityActive : ""}`} onClick={() => handleRarityClick("Common")}><Image src={"/images/Rarity/Star_Common.png"} width={30} height={30} alt='Common' /></button>
                            <div className={styles.tooltipText}>Common</div>
                        </div>

                        <div className={styles.tooltip}>
                            <button className={`${styles.uncommon} ${selectedRarity === "Uncommon" ? styles.rarityActive : ""}`} onClick={() => handleRarityClick("Uncommon")}><Image src={"/images/Rarity/Star_Uncommon.png"} width={30} height={30} alt='Uncommon' /></button>
                            <div className={styles.tooltipText}>Uncommon</div>
                        </div>

                        <div className={styles.tooltip}>
                            <button className={`${styles.rare} ${selectedRarity === "Rare" ? styles.rarityActive : ""}`} onClick={() => handleRarityClick("Rare")}><Image src={"/images/Rarity/Star_Rare.png"} width={30} height={30} alt='Rare' /></button>
                            <div className={styles.tooltipText}>Rare</div>
                        </div>

                        <div className={styles.tooltip}>
                            <button className={`${styles.epic} ${selectedRarity === "Epic" ? styles.rarityActive : ""}`} onClick={() => handleRarityClick("Epic")}><Image src={"/images/Rarity/Star_Epic.png"} width={30} height={30} alt='Epic' /></button>
                            <div className={styles.tooltipText}>Epic</div>
                        </div>
                    </div >
                </div >

                <div className={styles.line}></div>

                <div className={styles.priceScale}>
                    <h5>Price scale</h5>
                    <RangeSlider />
                </div>
            </div >
        </>
    )
}

export default IngredientsFilter;