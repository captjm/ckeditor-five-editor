// src/cif/components/Footer.tsx
import React from 'react';
import styles from './CifModal.module.scss';
import {CifFile} from '../types';

interface FooterProps {
    pending: CifFile | null;
    onConfirm: () => void;
}

export const Footer: React.FC<FooterProps> = ({pending, onConfirm}) => {
    return (
        <div className={styles.footer}>
            {pending && (
                <div className={styles.controls}>
                    <span className={styles.fileName}>
                        File selected: <strong>{pending.name}</strong>
                    </span>
                    <button
                        className={styles.btnConfirm}
                        onClick={onConfirm}
                    >
                        Select
                    </button>
                </div>
            )}
        </div>
    );
};