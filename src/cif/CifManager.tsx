// src/cif/CifManager.tsx
// src/cif/CifManager.ts
import React from 'react';
import {createRoot, Root} from 'react-dom/client';
import {CifApp} from './components/CifApp';

export class CifManager {
    #roots: Map<string, Root> = new Map();
    #apiOptions: Record<string, any>;

    constructor(apiOptions = {}) {
        this.#apiOptions = apiOptions;
    }

    public open(id: string, rootPath: string = 'uploads'): void {
        let container = document.getElementById(`cif-app-container-${id}`);

        if (!container) {
            container = document.createElement('div');
            container.id = `cif-app-container-${id}`;
            document.body.appendChild(container);
        }

        if (!this.#roots.has(id)) {
            const root = createRoot(container);
            this.#roots.set(id, root);
        }

        this.#roots.get(id)!.render(
            <CifApp
                id={id}
                rootPath={rootPath}
                onClose={() => this.close(id)}
            />
        );
    }

    public close(id: string): void {
        const root = this.#roots.get(id);
        if (root) {
            root.unmount();
            this.#roots.delete(id);
        }

        const container = document.getElementById(`cif-app-container-${id}`);
        if (container) {
            container.remove();
        }
    }

    public expose(): this {
        window.cifOpen = (id, root) => this.open(id, root);
        window.cifClose = (id) => this.close(id);

        window._cifCallbacks = window._cifCallbacks || {};

        return this;
    }
}