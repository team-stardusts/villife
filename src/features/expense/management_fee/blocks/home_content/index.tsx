import { View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useHomeContentFromManagementFeeStyles from "./styles";
import { useEffect, useState } from "react";
import useRenterMFViewModel from "../../viewmodel/renter";
import { PaymentBill } from "../../viewmodel/renter/types";
import ManagementFeeBox from "../../screens/home/blocks/user/blocks/fee";
import useManagementFeeBoxStyles from "../../screens/home/blocks/user/blocks/fee/styles";

export default function HomeContentFromManagementFee() {
    const styles = useHomeContentFromManagementFeeStyles();
    const feeBox = useManagementFeeBoxStyles();

    feeBox.container.paddingVertical *= 0.2;
    feeBox.managementFeeBox.marginVertical *= 0.8;
    feeBox.contentWrapper.paddingHorizontal = 0;

    const viewModel = useRenterMFViewModel();
    const [bill, setBill] = useState<PaymentBill | null>(null);

    useEffect(() => {
        if (!viewModel.user.isRenter) return;
        viewModel.update();
    }, []);

    useEffect(() => {
        setBill(viewModel.calcByPaymentItem(viewModel.data));
    }, [viewModel.data]);

    return (
        <MiniContent
            title={"관리비"}
            navigation={{
                to: "management_fee",
            }}
            titleColor={styles.contentsBox.color}
            backgroundColor={styles.contentsBox.backgroundColor}
            eanbleShadow={false}>
            <View style={styles.container}>
                <ManagementFeeBox
                    bill={bill}
                    billCreatedAt={viewModel.data[viewModel.data.length - 1]?.createdAt}
                    customStyles={feeBox}
                />
            </View>
        </MiniContent>
    );
}
