export default interface INaverLoginManager {
    join(id: string, password: string, accessToken: string): Promise<any>;
}