// src/cif/components/CifContext.tsx
import {createContext} from 'react';
import {CifBrowseResponse, CifPendingFile} from '../types';

interface CifContextType {
    path: string;
    setPath: (p: string) => void;
    data: CifBrowseResponse | null;
    setData: (d: CifBrowseResponse | null) => void;
    pending: CifPendingFile | null;
    setPending: (f: CifPendingFile | null) => void;
}

export const CifContext = createContext<CifContextType | undefined>(undefined);