// src/editor.ts
import {Alignment} from '@ckeditor/ckeditor5-alignment';
import {
    AutoImage,
    Image,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageResize,
    ImageUpload
} from '@ckeditor/ckeditor5-image';
import {AutoLink, Link, LinkImage} from '@ckeditor/ckeditor5-link';
import {Autoformat} from '@ckeditor/ckeditor5-autoformat';
import {Autosave} from '@ckeditor/ckeditor5-autosave';
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote';
import {Bold, Italic, Subscript, Superscript} from '@ckeditor/ckeditor5-basic-styles';
import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {GeneralHtmlSupport} from '@ckeditor/ckeditor5-html-support';
import {Heading} from '@ckeditor/ckeditor5-heading';
import {Indent, IndentBlock} from '@ckeditor/ckeditor5-indent';
import {List} from '@ckeditor/ckeditor5-list';
import {MediaEmbed} from '@ckeditor/ckeditor5-media-embed';
import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
import {RemoveFormat} from '@ckeditor/ckeditor5-remove-format';
import {SourceEditing} from '@ckeditor/ckeditor5-source-editing';
import {SpecialCharacters, SpecialCharactersCurrency} from '@ckeditor/ckeditor5-special-characters';
import {Style} from '@ckeditor/ckeditor5-style';
import {Table, TableToolbar} from '@ckeditor/ckeditor5-table';
import CMFileManager from './CMFileManager';

export default class CaptJMCKEditor extends ClassicEditor {
}

CaptJMCKEditor.builtinPlugins = [
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    BlockQuote,
    Bold,
    CMFileManager,
    Essentials,
    GeneralHtmlSupport,
    Heading,
    Image,
    ImageInline,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    MediaEmbed,
    Paragraph,
    RemoveFormat,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersCurrency,
    Style,
    Subscript,
    Superscript,
    Table,
    TableToolbar,
];

CaptJMCKEditor.defaultConfig = {
    licenseKey: 'GPL',
    toolbar: {
        items: [
            'heading',
            '|',
            'bold', 'italic', 'subscript', 'superscript',
            '|',
            'alignment',
            'outdent', 'indent',
            '|',
            'bulletedList', 'numberedList', 'blockQuote',
            '|',
            'link', 'insertTable', 'mediaEmbed',
            'imageInsert',
            'cmFileManager',
            '|',
            'specialCharacters', 'removeFormat',
            '|',
            'style',
            '|',
            'sourceEditing',
            '|',
            'undo', 'redo',
        ],
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'linkImage',
        ],
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    language: 'en',
};