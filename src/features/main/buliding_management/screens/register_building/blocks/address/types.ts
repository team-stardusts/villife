import { SelectedAddressType } from "../../../../../../common/hooks/states/atoms/address/selected_address/types";
import { VerifyBuildingAddress } from "../../../../services/provider/types";
import type useRegisterBuildingScreenStyles from "../../styles";

export type AddressSetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["search"];
    onChangeBuildingInfo(buildingInfo: BuildingInfo | null): void;
};

export type BuildingInfo = {
    address: SelectedAddressType;
    name: string;
};
