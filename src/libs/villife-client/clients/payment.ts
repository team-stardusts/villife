import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifePaymentClient extends VillifeClientCommon implements Villife.Payment.Client {
    public async createOrderForm(
        params: Villife.Payment.PaymentOrderCreationForm
    ): Promise<Villife.Payment.PaymentOrder | null> {
        return this.requestWithCredential({
            method: "post",
            url: this._routes.payment.order,
            data: params,
        });
    }
}

export default VillifePaymentClient;
