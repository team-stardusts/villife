import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { VillifeStackParamList } from "../../../../common/router/types";
import type useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useContractInformationScreenStyles from "./styles";
import { BuildingRoomContract } from "../../services/building_rooms/provider/types";

type ContractInformationScreenProps = NativeStackScreenProps<VillifeStackParamList, "contract_information">;

export default ContractInformationScreenProps;

export type TenantContractInfoProps = {
    styles: ReturnType<typeof useContractInformationScreenStyles>;
    messages: ReturnType<typeof useScreenMessage>["messages"];
    contract: BuildingRoomContract;
};
