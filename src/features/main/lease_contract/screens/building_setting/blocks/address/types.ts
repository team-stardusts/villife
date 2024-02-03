import { SelectedAddressType } from "../../../../../../common/hooks/states/atoms/address/selected_address/types";
import type useRegisterBuildingScreenStyles from "../../styles";

export type AddressSetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["search"];
    initialValue?: BuildingInfo | undefined;
    onChangeBuildingInfo(buildingInfo: BuildingInfo | null): void;
};

export type BuildingInfo = {
    roadAddress: string;
    name: string;
};
