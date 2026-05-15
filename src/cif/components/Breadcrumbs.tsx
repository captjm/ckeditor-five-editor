// src/cif/components/Breadcrumbs.tsx
import React from 'react';
import styles from './CifModal.module.scss';
import {CifBreadcrumb} from '../types';

interface BreadcrumbsProps {
    list: CifBreadcrumb[];
    onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({list, onNavigate}) => {
    return (
        <div className={styles.breadcrumb}>
            {list.map((crumb, i) => {
                const isLast = i === list.length - 1;
                return (
                    <React.Fragment key={crumb.path}>
                        {i > 0 && <span className={styles.sep}>/</span>}
                        <span
                            className={isLast ? styles.crumbCurrent : styles.crumb}
                            onClick={() => !isLast && onNavigate(crumb.path)}
                        >
                            {crumb.label}
                        </span>
                    </React.Fragment>
                );
            })}
        </div>
    );
};