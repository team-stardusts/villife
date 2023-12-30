namespace VillifeExpense {
    export interface Client {
        confirmPayment(params: PaymentConfirmationForm): Promise<string>;
        getBuildingMFHistory(buildingId: number): Promise<BuildingMFHistory[]>;
        getUserMFHistory(unpaidOnly?: true): Promise<ManagementFee[]>;
        requestPamentConfirmaion(params: PaymentConfirmaionRequestForm): Promise<string>;
        undoManagementFeeRenterTest(): Promise<string>;
    }

    export type BuildingMFHistory = {
        lastestNotiMonth: number;
        lastestNotiYear: number;
        lastestPaidMonth: number;
        lastestPaidYear: number;
        roomNumber: number;
        totalUnpaidFee: number;
        unpaidBills: ManagementFee[];
    };

    export type PaymentConfirmationForm = {
        billId: number;
        buildingId: number;
    };

    export type ManagementFee = {
        amountWon: number;
        billId: number;
        category: string;
        createdAt: number;
        detailBill: string;
        formId: number;
        isPaid: boolean;
        month: number;
        overdueInterest: number;
        paymentInfo: PaymentInfo;
        year: number;
    };

    export type PaymentConfirmaionRequestForm = {
        amountWon: number;
        billIds: number[];
        depositorName: string;
        roomId: number;
        roomNumber: number;
    };

    export type PaymentInfo = {};
}

export default VillifeExpense;
