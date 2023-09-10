import { Responsable } from "../../../../../libs/rest_apis/types";

export default abstract class AServiceProvider {
    protected abstract readonly errorTag: string;

    protected printWhyFailed(response: Responsable<any>["data"], message?: string) {
        console.error(`[${this.errorTag}]`, response?.status, message && message, `\n\tReason: ${response?.data}`);
    }
}
