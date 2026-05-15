import React from 'react';
import { CifFolder } from '../types';
interface FolderItemProps {
    folder: CifFolder;
    onOpen: (path: string) => void;
}
export declare const FolderItem: React.FC<FolderItemProps>;
export {};
