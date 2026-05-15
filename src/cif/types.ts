// src/cif/types.ts

export interface CifFile {
    name: string;
    path: string;
    url: string;
    size?: number;
    time?: number;
    thumb?: string;
}

export interface CifFolder {
    name: string;
    path: string;
}

export interface CifBreadcrumb {
    label: string;
    path: string;
}

export interface CifBrowseResponse {
    folders: CifFolder[];
    files: CifFile[];
    breadcrumb: CifBreadcrumb[];
}

export type CifCallback = (path: string, url: string) => void;

export class CifPendingFile {
    path: string;
    url: string;
    name: string;
}

declare global {
    interface Window {
        cifOpen: (id: string, root?: string) => void;
        cifClose: (id: string) => void;
        _cifCallbacks: Record<string, Function>;
        cifUpload: (event: any, id: string) => void;
    }
}