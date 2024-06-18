// Filter.tsx

import React from 'react'
import styles from "./filter.module.scss"
import Image from 'next/image';

interface FilterProps {
    onClose: () => void;
};

const Filter: React.FC<FilterProps> = ({ onClose }) => {
    return (
        <>
            <div className={styles.filter}>
                <div className={styles.top}>
                    <h4>Filter</h4>
                    <button onClick={onClose}>X</button>
                </div>

                <div className={styles.type}>
                    <h5>Type</h5>
                    <div>
                        <div className={styles.tooltip}>
                            <button><Image src={"/images/Type/Type_Mineral.png"} width={20} height={20} alt='Mineral' /></button>
                            <div className={styles.tooltipText}>Mineral</div>
                        </div>
                        <div className={styles.tooltip}>
                            <button><Image src={"/images/Type/Type_Vegetal.png"} width={20} height={20} alt='Vegetal' /></button>
                            <div className={styles.tooltipText}>Vegetal</div>
                        </div>
                        <div className={styles.tooltip}>
                            <button><Image src={"/images/Type/Type_Animal.png"} width={20} height={20} alt='Animal' /></button>
                            <div className={styles.tooltipText}>Animal</div>
                        </div>
                        <div className={styles.tooltip}>
                            <button><Image src={"/images/Type/Type_Mushroom.png"} width={20} height={20} alt='Mushroom' /></button>
                            <div className={styles.tooltipText}>Mushroom</div>
                        </div>
                    </div>
                </div>

                <div className={styles.line}></div>

                <div className={styles.rarity}>
                    <h5>Rarity</h5>
                    <div>
                        <div className={styles.tooltip}>
                            <button className={styles.common}><Image src={"/images/Rarity/Star_Common.png"} width={30} height={30} alt='Common' /></button>
                            <div className={styles.tooltipText}>Common</div>
                        </div>

                        <div className={styles.tooltip}>
                            <button className={styles.uncommon}><Image src={"/images/Rarity/Star_Uncommon.png"} width={30} height={30} alt='Uncommon' /></button>
                            <div className={styles.tooltipText}>Uncommon</div>
                        </div>

                        <div className={styles.tooltip}>
                            <button className={styles.rare}><Image src={"/images/Rarity/Star_Rare.png"} width={30} height={30} alt='Rare' /></button>
                            <div className={styles.tooltipText}>Rare</div>
                        </div>

                        <div className={styles.tooltip}>
                            <button className={styles.epic}><Image src={"/images/Rarity/Star_Epic.png"} width={30} height={30} alt='Epic' /></button>
                            <div className={styles.tooltipText}>Epic</div>
                        </div>
                    </div >
                </div >

                <div className={styles.line}></div>

                <div className={styles.priceScale}>
                    <h5>Price scale</h5>
                    <div>
                        <button><Image src={"/images/Rarity/Star_Common.png"} width={20} height={20} alt='Common' /></button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Filter