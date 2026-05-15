export declare class CifModal {
    #private;
    constructor(id: string);
    get el(): HTMLElement | null;
    show(): void;
    hide(): void;
    setInputValue(value: string): void;
    setThumbnail(url: string | null): void;
    setLabel(text: string, empty?: boolean): void;
    setClearButton(visible: boolean): void;
}
