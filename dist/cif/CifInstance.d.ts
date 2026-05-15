import { CifState } from './CifState';
export declare class CifInstance {
    #private;
    constructor(id: string, apiOptions?: Record<string, any>);
    get state(): CifState;
    open(root?: string): void;
    close(): void;
    browse(path: string): void;
    filter(value: string): void;
    up(): void;
    pickFile(path: string, url: string, name: string): void;
    confirm(): void;
    clear(): void;
    upload(file: File): void;
    resetInit(): void;
}
