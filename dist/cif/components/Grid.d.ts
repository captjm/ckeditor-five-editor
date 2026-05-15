import React from 'react';
import { CifBrowseResponse, CifFile } from '../types';
interface GridProps {
    data: CifBrowseResponse;
    filter: string;
    pendingPath?: string;
    onFolderOpen: (path: string) => void;
    onFileSelect: (file: CifFile) => void;
    onFileDoubleClick: (file: CifFile) => void;
}
export declare const Grid: React.FC<GridProps>;
export {};
