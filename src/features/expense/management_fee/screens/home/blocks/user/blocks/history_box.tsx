import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../../common/router/types";
import { Text, TouchableOpacity, View } from "react-native";
import ContentBox from "../../../../../../../common/blocks/content_box";
import { ManagementFeeHistoryBoxProps } from "../types";
import Icon from "../../../../../../../common/atoms/icon";

export default function PaymentHistoryBox(props: ManagementFeeHistoryBoxProps) {
    const navigation = useNavigation<VillifeNavigation>();

    return (
        <View style={props.styles.container}>
            <ContentBox backgroundColor={props.styles.contentBox.color}>
                <TouchableOpacity
                    style={props.styles.pressable}
                    activeOpacity={0.6}
                    onPress={() => {
                        navigation.navigate("management_fee_detail");
                    }}>
                    <Text style={props.styles.text}>관리비 납부 내역</Text>
                    <Icon name="arrow-right" size={props.styles.icon.width} color={props.styles.icon.color} />
                </TouchableOpacity>
            </ContentBox>
        </View>
    );
}
