// src/CMFileManager.ts
import {Plugin} from '@ckeditor/ckeditor5-core';
import {ButtonView} from '@ckeditor/ckeditor5-ui';
import type {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import cif from './cif/index';

export default class CMFileManager extends Plugin {
    public init(): void {
        const editor = this.editor as ClassicEditor;
        const el = editor.sourceElement;
        const cifId = 'cke-' + (el?.id || el?.getAttribute('name') || Math.random().toString(36).slice(2));

        editor.ui.componentFactory.add('cmFileManager', (locale) => {
            const button = new ButtonView(locale);
            button.set({label: 'File Manager', withText: true});

            button.on('execute', () => {
                if (typeof cif === 'undefined') return;

                const cifRoot = el?.dataset?.cifRoot ?? 'uploads';
                const selectedRanges = Array.from(editor.model.document.selection.getRanges());

                window._cifCallbacks[cifId] = (_path, url) => {
                    editor.model.change(writer => writer.setSelection(selectedRanges));
                    editor.execute('insertImage', {source: url});
                    editor.editing.view.focus();
                };

                window.cifOpen(cifId, cifRoot);
            });

            return button;
        });
    }
}