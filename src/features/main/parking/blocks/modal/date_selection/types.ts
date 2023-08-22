export type GuestVehicleDateSelectionModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onChangeDate(dateEtda: DateRange): void;
};

export type DateRange = {
    startDate: Date;
    endDate: Date;
};
