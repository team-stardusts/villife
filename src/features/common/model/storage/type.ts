export interface Storage<T = any> {
    getItem(key: string): Promise<T | null>;
    setItem(key: string, value: T | null): Promise<boolean>;
    removeItem(key: string): Promise<boolean>;
}
