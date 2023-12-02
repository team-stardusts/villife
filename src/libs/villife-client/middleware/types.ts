export interface Builder {
    [key: string]: any | ((params: any) => this | any);
}
