import { CifBrowseResponse, CifPendingFile } from './types';
export interface CifApiOptions {
    browseUrl?: string;
    uploadUrl?: string;
}
export interface CifUploadResponse extends Partial<CifPendingFile> {
    error?: string;
}
export declare class CifApi {
    #private;
    constructor(options?: CifApiOptions);
    browse(path: string): Promise<CifBrowseResponse>;
    upload(file: File, folder: string): Promise<CifUploadResponse>;
}
