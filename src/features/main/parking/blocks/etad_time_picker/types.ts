import { TimePickerTime } from "../../../../common/atoms/time_picker/types";

export type EtdaTime = {
    etd: TimePickerTime;
    eta: TimePickerTime;
};

export type EtdaTimePickerProps = {
    initialTime?: EtdaTime;
    enableShadow?: boolean;
    onTimeChange?(etdaTime: EtdaTime): void;
};
