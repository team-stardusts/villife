import { useEffect, useState } from "react";
import PaymentServiceProvider from "./provider";
import { IPaymentServiceProvider } from "./provider/types";
import { Payment } from "../../../../libs/rest_apis/villife/expense/types";

export function useGetPaymentWidgetUrl(params: Payment.CreateOrder.Params) {
    const [url, setUrl] = useState<string>();
    const service: IPaymentServiceProvider = new PaymentServiceProvider();

    useEffect(() => {
        (async () => {
            const result = await service.getPaymentWidgetUrl(params);

            if (result == null) return;

            setUrl(result);
        })();
    }, []);

    return url;
}
