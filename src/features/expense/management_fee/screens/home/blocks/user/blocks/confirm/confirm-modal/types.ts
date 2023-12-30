import { PaymentBill } from "../../../../../../../viewmodel/renter/types";

export type PaymentInfoInputModalProps = {
    bill: PaymentBill;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
