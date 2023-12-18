import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifeExpenseClient extends VillifeClientCommon implements Villife.Expense.Client {
    public async confirmPayment(params: Villife.Expense.PaymentConfirmationForm): Promise<string> {
        return await this.requestWithCredential({
            method: "post",
            url: this._routes.expense.confirmPayment,
            data: params,
        });
    }

    public async getBuildingMFHistory(buildingId: number): Promise<Villife.Expense.BuildingMFHistory[]> {
        return await this.requestWithCredential({
            method: "get",
            url: this._routes.expense.handleBuildingBill,
            params: {
                buildingId,
            },
        });
    }

    public async getUserMFHistory(unpaidOnly?: true): Promise<Villife.Expense.ManagementFee[]> {
        const _unpaidOnly = unpaidOnly ? "yes" : "no";

        return await this.requestWithCredential({
            method: "get",
            url: this._routes.expense.handleMyBill,
            params: {
                unpaidOnly: _unpaidOnly,
            },
        });
    }

    public async requestPamentConfirmaion(params: Villife.Expense.PaymentConfirmaionRequestForm): Promise<string> {
        return await this.requestWithCredential({
            method: "post",
            url: this._routes.approval.requestMFPaymentConfirmation,
            data: params,
        });
    }

    public async undoManagementFeeRenterTest(): Promise<string> {
        return await this.requestWithCredential({
            method: "get",
            url: this._routes.test.testExpense,
        });
    }
}

export default VillifeExpenseClient;
