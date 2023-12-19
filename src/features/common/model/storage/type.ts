export interface Storage<T = any> {
    key: string;
    getItem(): Promise<T | null>;
    setItem(value: T | null): Promise<boolean>;
    removeItem(): Promise<boolean>;
}
