import VillifeServer from "../../../../../libs/rest_apis/villife";
import AServiceProvider from "../../../../common/hooks/service/provider/absc";
import { IPaymentServiceProvider } from "./types";
import DotEnv from "../../../../../libs/dotenv";
import { Payment } from "../../../../../libs/rest_apis/villife/payment/types";

export default class PaymentServiceProvider extends AServiceProvider implements IPaymentServiceProvider {
    protected readonly errorTag = "PAYMENT_SERVICE";
    private readonly _api = VillifeServer.getPaymentRestClient();
    private readonly env = new DotEnv();

    public async getPaymentWidgetUrl(params: Payment.CreateOrder.Params): Promise<string | null> {
        const result = await this._api.createOrderForm(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data);
            return null;
        }

        if (result.data.data == null) {
            console.log("cannot open web view, failed to create order");
            return null;
        }

        const url = `${this.env.api.villife.REST_API_BASE_URL}payment/widget?order_unique_id=${result.data.data.unique_id}`;

        return url;
    }
}
