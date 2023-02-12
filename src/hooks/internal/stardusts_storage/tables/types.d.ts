import ATable from "./absc";


export interface ILoginTable extends ATable{
    get(): Promise<LoginDataType | null>;
    set(data: LoginDataType): Promise<boolean>;
    remove(): Promise<void>;
}

export type LoginDataType = {
    userId: string;
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
}