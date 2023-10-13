import type useRegisterBuildingScreenStyles from "../../styles";

export type MFDateSetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["date"];
    onChangeMFDate(mfDate: MFDate | null): void;
};

export type MFDate = {
    dueDate: Date;
    notiDate: Date;
};
