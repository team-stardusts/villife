export interface ViewModel<T = any> {
    data: T;
    update(params: any): Promise<void>;
}
