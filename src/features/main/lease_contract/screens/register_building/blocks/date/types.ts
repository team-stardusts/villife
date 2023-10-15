import type useRegisterBuildingScreenStyles from "../../styles";

export type MFDaysSetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["date"];
    onChangeMFDay(mfDate: MFDate | null): void;
};

export type MFDaySetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["date"];
};

export type MFDate = {
    dueDate: Date;
    notiDate: Date;
};
