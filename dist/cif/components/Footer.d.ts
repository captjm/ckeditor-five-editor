import React from 'react';
import { CifFile } from '../types';
interface FooterProps {
    pending: CifFile | null;
    onConfirm: () => void;
}
export declare const Footer: React.FC<FooterProps>;
export {};
