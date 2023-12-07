export interface ViewModel<T = any> {
    data: T;
    restore(): Promise<void>;
    save(): Promise<void>;
    update(params: any): Promise<void>;
}
