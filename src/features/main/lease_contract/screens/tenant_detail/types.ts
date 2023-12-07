import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { VillifeStackParamList } from "../../../../common/router/types";
import type { BuildingRoomInfo } from "../../services/building_rooms/provider/types";
import type useTenantDetailScreenStyles from "./styles";
import type useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import Villife from "../../../../../libs/villife-client/types";

type TenantDetailScreenProps = NativeStackScreenProps<VillifeStackParamList, "tenant_detail">;

export default TenantDetailScreenProps;

export type TenantInfoProps = {
    styles: ReturnType<typeof useTenantDetailScreenStyles>;
    messages: ReturnType<typeof useScreenMessage>["messages"];
    tenant: Villife.Contract.Room;
};
