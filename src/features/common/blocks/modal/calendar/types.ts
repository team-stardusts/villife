import type { Moment } from "moment";

export type CalendarDatePickerProps = {
    allowRangeSelection?: boolean;
    initialDate?: Date;
    selectedStartData?: Date;
    selectedEndData?: Date;
    width?: number;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    onDateRangeChange?(dates: Dates): void;
    onDateChange?(date: Date): void;
};

export type PickedDates = {
    startDate: Date | null;
    endDate: Date | null;
};

export type Dates = {
    startDate: Date;
    endDate: Date;
};
