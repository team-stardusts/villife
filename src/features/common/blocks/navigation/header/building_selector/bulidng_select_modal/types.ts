import Villife from "../../../../../../../libs/villife-client/types";

export type BuildingSelectModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    managedBuildings?: Villife.User.SimpleBuildingInfo[] | null;
    onBuildingPress(buidingInfo: Villife.User.SimpleBuildingInfo): void;
};

export type AddBuildingComponentProps = {
    height: number;
    onPress(): void;
};

export type BuildingComponentProps = {
    height: number;
    buidingInfo: Villife.User.SimpleBuildingInfo;
    onPress(buidingInfo: BuildingComponentProps["buidingInfo"]): void;
};
