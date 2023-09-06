import VillifeServer from "../../../../../libs/rest_apis/villife";
import { Payment } from "../../../../../libs/rest_apis/villife/payment/type";

export default class CreateOrderFormUsecase {
    private readonly dataSource = VillifeServer.getPaymentRestClient();

    async create(params: Payment.CreateOrder.Params): Promise<Payment.CreateOrder.Result> {
        const result = await this.dataSource.CreateOrderForm(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            return null;
        }

        return result.data.data;
    }
}
