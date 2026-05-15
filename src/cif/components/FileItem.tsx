// src/cif/components/FileItem.tsx
import React from 'react';
import styles from './CifModal.module.scss';
import {CifFile} from '../types';

interface FileItemProps {
    file: CifFile;
    isSelected: boolean;
    onSelect: (file: CifFile) => void;
    onDoubleClick: (file: CifFile) => void;
}

export const FileItem: React.FC<FileItemProps> = ({ file, isSelected, onSelect, onDoubleClick }) => {
    return (
        <div
            className={`${styles.item} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelect(file)}
            onDoubleClick={() => onDoubleClick(file)}
            title={file.name}
        >
            <div className={styles.itemThumb}>
                <img src={file.url} alt={file.name} />
            </div>
            <div className={styles.itemName}>{file.name}</div>
        </div>
    );
};