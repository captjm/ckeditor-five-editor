# CaptJM CKEditor 5 & CIF Manager

This repository contains a professional custom build of **CKEditor 5** integrated with the **CIF (CaptJM Image/File) Manager**, a modern React-powered file management system.

---

## Overview

This project provides a seamless bridge between a high-end rich-text editor and a flexible file browser. Unlike standard editor builds, this version uses a custom React interface to handle server-side file browsing, filtering, and selection.

### Key Components
*   **CaptJM CKEditor**: A customized build of CKEditor 5 with optimized plugins.
*   **CIF Manager**: A React 18 + TypeScript application for file/folder management.
*   **The Bridge**: A dedicated CKEditor plugin (`CMFileManager.ts`) that handles communication between the editor instance and the React UI.

---

## Features

*   **React-Powered Interface**: Fast, responsive, and easy to customize.
*   **Double-Click Selection**: Instantly insert files into the editor by double-clicking.
*   **Breadcrumb Navigation**: Dynamic path tracking based on API responses.
*   **TypeScript Core**: Robust typing for both the editor bridge and the React components.
*   **Scoped Styling**: Uses SCSS Modules to prevent CSS leaks.

---

## Project Structure

```text
├── src/
│   ├── cif/                # CIF File Manager (React Application)
│   │   ├── components/     # UI Components (Breadcrumbs, Grid, Header, etc.)
│   │   ├── CifManager.tsx  # React Mounter and Global Exposer
│   │   ├── CifApi.ts       # API Fetching logic
│   │   └── types.ts        # TypeScript Interfaces & Global Window Declarations
│   ├── CMFileManager.ts    # CKEditor 5 Plugin (The Bridge)
│   └── editor.ts           # CKEditor configuration & Entry Point
├── dist/                   # Compiled production bundles
└── webpack.config.js       # Webpack build configuration

```

---

## Development & Build

### Prerequisites

* **Node.js** (v16.x or higher)
* **npm** or **yarn**

### Installation

```bash
npm install
```

### Build for Production

Compiles the React application and the CKEditor source into a single optimized JavaScript file:

```bash
npm run build
```

### Development (Watch Mode)

```bash
npx webpack --watch --mode development
```

---

## Integration Guide

To use the editor in your project, initialize both the `CifManager` and the `ClassicEditor`.

```typescript
import ClassicEditor from './dist/editor';
import { CifManager } from './src/cif/CifManager';

// 1. Initialize the File Manager Global Instance
const cif = new CifManager({
    apiUrl: '/api/browse',
    rootPath: 'uploads'
});
cif.expose(); // Makes window.cifOpen and window.cifUpload available

// 2. Initialize CKEditor
ClassicEditor.create(document.querySelector('#editor'), {
    toolbar: [ 'bold', 'italic', 'cmFileManager', 'insertImage', '...'],
    // Configuration options...
})
.then(editor => {
    console.log('CaptJM Editor is ready!');
})
.catch(error => {
    console.error(error);
});

```

---

## API Specification

The CIF Manager expects your backend to return a specific JSON structure for directory browsing:

```json
{
  "folders": [
    { "name": "Banners", "path": "uploads/banners" }
  ],
  "files": [
    { 
      "name": "hero.jpg", 
      "path": "uploads/hero.jpg", 
      "url": "[https://your-domain.com/media/hero.jpg](https://your-domain.com/media/hero.jpg)" 
    }
  ],
  "breadcrumb": [
    { "label": "Root", "path": "uploads" },
    { "label": "Images", "path": "uploads/images" }
  ]
}

```

---

## Configuration Note

Ensure that your `tsconfig.json` includes `src//*.ts` and `src//*.tsx` to properly handle the global `Window` extensions used for the communication between React and CKEditor.

---

## License

GPL-3.0

---