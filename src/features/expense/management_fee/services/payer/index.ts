import { useEffect, useState } from "react";
import ManagementFeePaymentServiceProvider from "../provider";
import StardustDateParser from "../../../../../libs/date_parser";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/payment/types";
import useManagementFeePaymentHistory from "./history";

export default function usePayer() {
    /* const [crrYear, setCrrYear] = useState<number | null>(null);
    const [crrMonth, setCrrMonth] = useState<number | null>(null);
    const [fees, setFees] = useState<Payment.ManagementFee[] | null>(null);
    const service = new PaymentServiceProvider();

    useEffect(() => {
        const today = StardustDateParser.changeGMT(new Date(), "kr");
        setCrrYear(today.getFullYear());
        setCrrMonth(today.getMonth() + 1);
    }, []);

    useEffect(() => {
        getManagementFeeInAYear();
    }, [crrYear, crrMonth]);

    const getManagementFeeInAYear = async () => {
        if (crrYear === null || crrMonth === null) return;

        const managementFees = await service.getBills({
            startYear: crrYear - 1,
            endYear: crrYear,
            startMonth: 1,
            endMonth: 12,
        });

        setFees(managementFees);
    };

    if (fees === null) return null; */
    const history = useManagementFeePaymentHistory();

    class Payer {
        public readonly history = history;

        /* get fees(): Payment.ManagementFee[] {
            return fees as Payment.ManagementFee[];
        }

        get thisMonthFee(): Payment.ManagementFee | undefined {
            return this.fees?.find((fee) => fee.year === this.crrYear && fee.month === this.crrMonth);
        } */
    }

    return new Payer();
}
