import useMFDataSetterStyles from "../../styles";

export type MFDaySetterProps = {
    styles: ReturnType<typeof useMFDataSetterStyles>;
    initialDay: number | null;
    dayName: string;
    explanation: string;
    onChangeMFDay(mfday: number): void;
};
