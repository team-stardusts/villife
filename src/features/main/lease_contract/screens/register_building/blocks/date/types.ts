import type useRegisterBuildingScreenStyles from "../../styles";

export type MFDaysSetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["date"];
    onChangeMFDay(mfday: MFDays): void;
};

export type MFDaySetterProps = {
    styles: ReturnType<typeof useRegisterBuildingScreenStyles>["date"];
    initialDay: number | null;
    dayName: string;
    explanation: string;
    onChangeMFDay(mfday: number): void;
};

export type MFDays = {
    dueDay: number | null;
    notiDay: number | null;
};
