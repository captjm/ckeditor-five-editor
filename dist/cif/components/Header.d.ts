import React from 'react';
import { CifBreadcrumb } from "../types";
interface HeaderProps {
    id: string;
    onUp: () => void;
    onSearch: (value: string) => void;
    onClose: () => void;
    canGoUp: boolean;
    breadcrumbs: CifBreadcrumb[];
    onNavigate: (path: string) => void;
}
export declare const Header: React.FC<HeaderProps>;
export {};
