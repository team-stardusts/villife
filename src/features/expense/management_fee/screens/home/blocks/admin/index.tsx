import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenTopFilter from "../../../../../../common/blocks/top_filter";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { AdminMFViewProps } from "./types";
import { AdminPaymentManagerBase } from "../../../../services/payment/types";
import useManagementFeeManager from "../../../../services/payment";
import { ManagementFee } from "../../../../../../../libs/rest_apis/villife/expense/types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../common/router/types";

export default function AdminMFView(props: AdminMFViewProps) {
    const { deviceUI, theme } = useStyler();
    const navigation = useNavigation<VillifeNavigation>();
    const manager: AdminPaymentManagerBase = useManagementFeeManager() as AdminPaymentManagerBase;

    return (
        <ScrollView>
            <View
                style={{
                    width: "100%",
                    height: deviceUI.moderateScale(80),
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: deviceUI.moderateScale(20),
                    paddingHorizontal: deviceUI.moderateScale(20),
                }}>
                <TouchableOpacity
                    style={{
                        width: "80%",
                        height: "100%",
                        backgroundColor: theme.color.specified.blue,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                    }}
                    onPress={() => navigation.navigate("building_mf_history")}>
                    <Text style={{ color: theme.color.specified.white, fontSize: 25, fontWeight: "bold" }}>
                        관리비 현황으로
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
