import { CifBrowseResponse, CifPendingFile } from '../types';
interface CifContextType {
    path: string;
    setPath: (p: string) => void;
    data: CifBrowseResponse | null;
    setData: (d: CifBrowseResponse | null) => void;
    pending: CifPendingFile | null;
    setPending: (f: CifPendingFile | null) => void;
}
export declare const CifContext: import("react").Context<CifContextType>;
export {};
