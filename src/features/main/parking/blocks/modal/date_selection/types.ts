export type GuestVehicleDateSelectionModalProps = {
    visible: boolean;
    selectedStartDate?: Date;
    selectedEndDate?: Date;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onChangeDate(dateEtda: DateRange): void;
};

export type DateRange = {
    startDate: Date;
    endDate: Date;
};
