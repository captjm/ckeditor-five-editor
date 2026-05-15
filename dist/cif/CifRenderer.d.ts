import { CifBreadcrumb, CifBrowseResponse, CifPendingFile } from './CifState';
export declare class CifRenderer {
    #private;
    constructor(id: string);
    showLoading(message?: string): void;
    renderBreadcrumb(breadcrumb: CifBreadcrumb[], currentPath: string, root: string): void;
    renderGrid(data: CifBrowseResponse | null, filter: string, pendingPath?: string): void;
    updateSelection(path: string): void;
    renderPending(pending: CifPendingFile | null): void;
    clearSearch(): void;
}
