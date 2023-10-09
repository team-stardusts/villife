import BuildingManagementServiceProvider from "../../../../../main/lease_contract/services/building_rooms/provider";

abstract class PaymentManager {
    protected readonly _api = new BuildingManagementServiceProvider();
}

export default PaymentManager;
