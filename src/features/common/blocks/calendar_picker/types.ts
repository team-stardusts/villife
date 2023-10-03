import type { Moment } from "moment";

export type CalendarDatePickerProps = {
    initialDate?: Date;
    selectedStartData?: Date;
    selectedEndData?: Date;
    width?: number;
    minDate?: Date | undefined;
    onDateChange?(dates: Dates): void;
};

export type PickedDates = {
    startDate: Date | null;
    endDate: Date | null;
};

export type Dates = {
    startDate: Date;
    endDate: Date;
};
