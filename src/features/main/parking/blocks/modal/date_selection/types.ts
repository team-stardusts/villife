import { TimePickerTime } from "../../../../../common/atoms/time_picker/types";
import type { Dates } from "../../../../../common/blocks/calendar_picker/types";
import type { EtdaTime } from "../../etad_time_picker/types";

export type GuestVehicleDateSelectionModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onChangeDate(dateEtda: DateTimeRange): void;
};

export type DateTimeRange = {
    startDate: DateTime;
    endDate: DateTime;
};

export type DateTime = {
    date: Date;
    time: TimePickerTime;
};
