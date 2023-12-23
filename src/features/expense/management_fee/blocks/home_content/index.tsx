import { Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useHomeContentFromManagementFeeStyles from "./styles";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import SpinningWon from "../icon/spinning_won";
import { insertCommaToNumber } from "../../../../common/global_function";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import StardustDateParser from "../../../../../libs/date_parser";
import useRenterMFViewModel from "../../viewmodel/renter";
import { PaymentBill } from "../../viewmodel/renter/types";
import ManagementFeeBox from "../../screens/home/blocks/user/blocks/fee_box";
import useUserMFViewStyles from "../../screens/home/blocks/user/styles";

export default function HomeContentFromManagementFee() {
    const styles = useHomeContentFromManagementFeeStyles();
    const feeBox = useUserMFViewStyles().managementFee;
    feeBox.header.marginTop = 0;
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
                <ManagementFeeBox bill={bill} styles={feeBox} />
            </View>
        </MiniContent>
    );
}
