// src/cif/components/CifApp.tsx
import React, {useEffect, useMemo, useState} from 'react';
import {Header} from './Header';
import {Grid} from './Grid';
import {Footer} from './Footer';
import styles from './CifModal.module.scss';
import {CifApi} from '../CifApi';
import {CifBrowseResponse, CifFile} from '../types';

interface CifAppProps {
    id: string;
    rootPath: string;
    onClose: () => void;
}

export const CifApp: React.FC<CifAppProps> = ({id, rootPath, onClose}) => {
    const [currentPath, setCurrentPath] = useState(rootPath);
    const [data, setData] = useState<CifBrowseResponse | null>(null);
    const [filter, setFilter] = useState('');
    const [pending, setPending] = useState<CifFile | null>(null);

    const api = useMemo(() => new CifApi(), []);

    useEffect(() => {
        api.browse(currentPath).then(setData);
    }, [currentPath, api]);

    const handleFileDoubleClick = (file: CifFile) => {
        setPending(file);
        confirmSelection(file);
    };

    const confirmSelection = (fileToConfirm: CifFile | null) => {
        const file = fileToConfirm || pending;
        if (!file) return;

        const prefix = rootPath + '/';
        const storedPath = file.path.startsWith(prefix)
            ? file.path.slice(prefix.length)
            : file.path;

        if (window._cifCallbacks && window._cifCallbacks[id]) {
            window._cifCallbacks[id](storedPath, file.url);
            delete window._cifCallbacks[id];
        }
        onClose();
    };

    const handleConfirm = () => {
        confirmSelection(pending);
    };

    return (
        <div className={styles.modalOverlay} style={{display: 'flex'}}>
            <div className={styles.modalContent}>
                <Header
                    id={id}
                    onUp={() => {
                        const parts = currentPath.split('/');
                        parts.pop();
                        setCurrentPath(parts.join('/'));
                    }}
                    onSearch={setFilter}
                    onClose={onClose}
                    canGoUp={currentPath !== rootPath}
                    breadcrumbs={data?.breadcrumb || []}
                    onNavigate={setCurrentPath}
                />

                <div className={styles.body}>
                    {data ? (
                        <Grid
                            data={data}
                            filter={filter}
                            pendingPath={pending?.path}
                            onFolderOpen={(path) => {
                                setCurrentPath(path);
                                setPending(null);
                            }}
                            onFileSelect={(file) => setPending(file)}
                            onFileDoubleClick={handleFileDoubleClick}
                        />
                    ) : (
                        <div className={styles.loading}>Loading files...</div>
                    )}
                </div>

                <Footer
                    pending={pending}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
};