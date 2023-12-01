export interface Builder {
    [key: string]: (params: any) => this | any;
}
