import React from 'react';
import { CifBreadcrumb } from '../types';
interface BreadcrumbsProps {
    list: CifBreadcrumb[];
    onNavigate: (path: string) => void;
}
export declare const Breadcrumbs: React.FC<BreadcrumbsProps>;
export {};
