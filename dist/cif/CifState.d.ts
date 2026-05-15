export interface CifFile {
    name: string;
    path: string;
    url: string;
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
    breadcrumb: CifBreadcrumb[];
    folders: CifFolder[];
    files: CifFile[];
    error?: string;
}
export interface CifPendingFile {
    path: string;
    url: string;
    name: string;
}
export declare class CifState {
    id: string;
    root: string;
    path: string;
    filter: string;
    data: CifBrowseResponse | null;
    pending: CifPendingFile | null;
    initialized: boolean;
    constructor(id: string);
    reset(): void;
}
