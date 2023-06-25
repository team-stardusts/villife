import { SimpleBuildingInfo } from "../../../../../../../libs/rest_apis/villife/user_info/types";

export type BuildingSelectModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    managedBuildings?: SimpleBuildingInfo[] | null;
    onBuildingPress(buidingInfo: SimpleBuildingInfo): void;
};

export type BuildingComponentProps = {
    height: number;
    buidingInfo: SimpleBuildingInfo;
    onPress(buidingInfo: BuildingComponentProps["buidingInfo"]): void;
};
