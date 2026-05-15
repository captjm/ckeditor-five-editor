// src/cif/components/Header.tsx
import React from 'react';
import styles from './CifModal.module.scss';
import {Breadcrumbs} from "./Breadcrumbs";
import {CifBreadcrumb} from "../types";

interface HeaderProps {
    id: string;
    onUp: () => void;
    onSearch: (value: string) => void;
    onClose: () => void;
    canGoUp: boolean;
    breadcrumbs: CifBreadcrumb[];
    onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({id, onUp, onSearch, onClose, canGoUp, breadcrumbs, onNavigate}) => {
    return (
        <div className={styles.header}>
            <Breadcrumbs list={breadcrumbs} onNavigate={onNavigate} />

            {canGoUp && (
                <button className={styles.btnUp} onClick={onUp}>
                    ↑ Up
                </button>
            )}

            <input
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
            />

            <label className={styles.btnUpload}>
                Upload
                <input
                    type="file"
                    style={{display: 'none'}}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) window.cifUpload(e, id);
                    }}
                />
            </label>

            <button className={styles.btnClose} onClick={onClose}>✕</button>
        </div>
    );
};