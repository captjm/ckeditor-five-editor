// src/cif/components/FolderItem.tsx
import React from 'react';
import styles from './CifModal.module.scss';
import {CifFolder} from '../types';

interface FolderItemProps {
    folder: CifFolder;
    onOpen: (path: string) => void;
}

export const FolderItem: React.FC<FolderItemProps> = ({folder, onOpen}) => {
    return (
        <div
            className={`${styles.item} ${styles.folder}`}
            onDoubleClick={() => onOpen(folder.path)}
            title={folder.name}
        >
            <div className={styles.itemIcon}>📁</div>
            <div className={styles.itemName}>{folder.name}</div>
        </div>
    );
};