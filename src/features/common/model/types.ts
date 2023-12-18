export interface ViewModel<T = any> {
    data: T;
    restore(): Promise<T>;
    save(): Promise<void>;
    update(params: any): Promise<void>;
}
