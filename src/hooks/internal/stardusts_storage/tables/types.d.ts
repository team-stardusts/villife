import ATable from "./absc";


export interface ILoginTable extends ATable{
    get(): Promise<LoginData | null>;
    set(data: LoginData): Promise<boolean>;
    remove(): Promise<void>;
}

export type LoginData = {
    id: string;
    token: string;
}