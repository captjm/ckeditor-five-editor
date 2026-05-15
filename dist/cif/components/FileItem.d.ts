import React from 'react';
import { CifFile } from '../types';
interface FileItemProps {
    file: CifFile;
    isSelected: boolean;
    onSelect: (file: CifFile) => void;
    onDoubleClick: (file: CifFile) => void;
}
export declare const FileItem: React.FC<FileItemProps>;
export {};
