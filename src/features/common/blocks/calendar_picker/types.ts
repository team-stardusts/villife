import type { Moment } from "moment";

export type CalendarDatePickerProps = {
    initialDate?: Date;
    width?: number;
    minDate?: Date | undefined;
    onDateChange?(dates: Dates): void;
};

export type PickedDates = {
    startDate: Date;
    endDate: Date | null;
};

export type Dates = {
    startDate: Date;
    endDate: Date;
};
