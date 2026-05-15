// src/cif/CifApi.ts
import {CifBrowseResponse, CifPendingFile} from './types';

export interface CifApiOptions {
    browseUrl?: string;
    uploadUrl?: string;
}

export interface CifUploadResponse extends Partial<CifPendingFile> {
    error?: string;
}

export class CifApi {
    readonly #browseUrl: string;
    readonly #uploadUrl: string;

    constructor(options: CifApiOptions = {}) {
        const {
            browseUrl = '/admin/file-browser/browse',
            uploadUrl = '/admin/file-browser/upload',
        } = options;

        this.#browseUrl = browseUrl;
        this.#uploadUrl = uploadUrl;
    }

    public async browse(path: string): Promise<CifBrowseResponse> {
        const url = `${this.#browseUrl}?path=${encodeURIComponent(path)}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`CIF API Browse error: ${response.statusText}`);
        }

        return response.json();
    }

    public async upload(file: File, folder: string): Promise<CifUploadResponse> {
        const fd = new FormData();
        fd.append('file', file);

        if (folder) {
            fd.append('folder', folder);
        }

        const response = await fetch(this.#uploadUrl, {
            method: 'POST',
            body: fd
        });

        if (!response.ok) {
            try {
                return await response.json();
            } catch {
                return {error: `Server returned ${response.status}: ${response.statusText}`};
            }
        }

        return response.json();
    }
}