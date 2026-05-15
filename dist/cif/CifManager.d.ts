export declare class CifManager {
    #private;
    constructor(apiOptions?: {});
    open(id: string, rootPath?: string): void;
    close(id: string): void;
    expose(): this;
}
