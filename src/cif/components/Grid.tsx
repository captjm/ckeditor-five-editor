// src/cif/components/Grid.tsx
import React from 'react';
import styles from './CifModal.module.scss';
import {FolderItem} from './FolderItem';
import {FileItem} from './FileItem';
import {CifBrowseResponse, CifFile} from '../types';

interface GridProps {
    data: CifBrowseResponse;
    filter: string;
    pendingPath?: string;
    onFolderOpen: (path: string) => void;
    onFileSelect: (file: CifFile) => void;
    onFileDoubleClick: (file: CifFile) => void;
}

export const Grid: React.FC<GridProps> = ({data, filter, pendingPath, onFolderOpen, onFileSelect, onFileDoubleClick}) => {
    const lowerFilter = filter.toLowerCase();

    const folders = data.folders.filter(f => f.name.toLowerCase().includes(lowerFilter));
    const files = data.files.filter(f => f.name.toLowerCase().includes(lowerFilter));

    if (folders.length === 0 && files.length === 0) {
        return <div className={styles.empty}>No items found.</div>;
    }

    return (
        <div className={styles.grid}>
            {folders.map(folder => (
                <FolderItem
                    key={folder.path}
                    folder={folder}
                    onOpen={onFolderOpen}
                />
            ))}
            {files.map(file => (
                <FileItem
                    key={file.path}
                    file={file}
                    isSelected={pendingPath === file.path}
                    onSelect={onFileSelect}
                    onDoubleClick={onFileDoubleClick}
                />
            ))}
        </div>
    );
};