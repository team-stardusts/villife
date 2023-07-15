import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { Vehicle } from "../../services/states/types";
import useHomeContentFromParkingStyles from "./styles";

export const PRESSABLE_MENU_TYPE = {
    VEHICLE_LIST: "vehicle_list",
    REGISTER_GUEST: "register_guest",
    VEHICLE_DEFARTURE_MANAGEMENT: "vehicle_departure_management",
} as const;

export type PressableMenuType = (typeof PRESSABLE_MENU_TYPE)[keyof typeof PRESSABLE_MENU_TYPE];

export type PressableMenuProps = {
    messages: ReturnType<typeof useScreenMessage>["messages"]["main"]["parking"]["home_content"];
    type: PressableMenuType;
    styles: ReturnType<typeof useHomeContentFromParkingStyles>["menu"];
    vehicle: Vehicle | null;
};
