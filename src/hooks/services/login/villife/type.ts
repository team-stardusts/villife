export default interface IVillifeLoginManater {
    login(params: any): any;
}

export type LoginParams = {
    id: string;
    password: string;
};
