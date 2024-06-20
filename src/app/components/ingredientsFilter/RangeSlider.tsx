// RangeSlider.tsx

"use client"

import { useState, useRef, useEffect } from 'react';
import styles from './rangeSlider.module.scss';
import Image from 'next/image';

const RangeSlider: React.FC = () => {
    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(350);
    const minHandle = useRef<HTMLDivElement>(null);
    const maxHandle = useRef<HTMLDivElement>(null);
    const rangeBar = useRef<HTMLDivElement>(null);
    const isDragging = useRef<{ min: boolean, max: boolean }>({ min: false, max: false });

    useEffect(() => {
        const handleMove = (e: MouseEvent, handle: 'min' | 'max') => {
            if (!rangeBar.current) return;
            const rect = rangeBar.current.getBoundingClientRect();
            let newValue = Math.round(((e.clientX - rect.left) / rect.width) * 349) + 1;
            if (newValue < 1) newValue = 1;
            if (newValue > 350) newValue = 350;

            if (handle === 'min' && newValue < maxValue) {
                setMinValue(newValue);
            } else if (handle === 'max' && newValue > minValue) {
                setMaxValue(newValue);
            }
        };

        const handleMouseUp = () => {
            isDragging.current = { min: false, max: false };
        };

        const onMouseMove = (e: MouseEvent) => {
            if (isDragging.current.min) handleMove(e, 'min');
            if (isDragging.current.max) handleMove(e, 'max');
        };

        const handleMouseDown = (handle: 'min' | 'max') => {
            isDragging.current[handle] = true;
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        if (minHandle.current) {
            minHandle.current.addEventListener('mousedown', () => handleMouseDown('min'));
        }

        if (maxHandle.current) {
            maxHandle.current.addEventListener('mousedown', () => handleMouseDown('max'));
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            if (minHandle.current) {
                minHandle.current.removeEventListener('mousedown', () => handleMouseDown('min'));
            }
            if (maxHandle.current) {
                maxHandle.current.removeEventListener('mousedown', () => handleMouseDown('max'));
            }
        };
    }, [minValue, maxValue]);

    const goldImage = <Image src={"/images/Miscellaneous/Gold.png"} width={15} height={15} alt='Gold' />

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.rangeBar} ref={rangeBar}>
                <div className={styles.valueLabelLeft}>
                    min : {goldImage} <span>1</span>
                </div>
                <div className={styles.valueLabelRight}>
                    max : {goldImage} <span>350</span>
                </div>

                <div className={styles.tooltip} style={{ left: `${((minValue - 1) / 349) * 100}%` }}>
                    {minValue}
                </div>

                <div className={styles.tooltip} style={{ left: `${((maxValue - 1) / 349) * 100}%` }}>
                    {maxValue}
                </div>

                <div
                    className={styles.range}
                    style={{
                        left: `${((minValue - 1) / 349) * 100}%`,
                        right: `${100 - ((maxValue - 1) / 349) * 100}%`,
                    }}
                ></div>

                <div
                    className={`${styles.handle} ${styles.minHandle}`}
                    ref={minHandle}
                    style={{ left: `${((minValue - 1) / 349) * 100}%` }}
                ></div>

                <div
                    className={`${styles.handle} ${styles.maxHandle}`}
                    ref={maxHandle}
                    style={{ left: `${((maxValue - 1) / 349) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default RangeSlider;
