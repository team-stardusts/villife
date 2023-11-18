import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useConfirmPaymentScreenStyles from "./styles";
import ConfirmPaymentCostScreenProps from "./types";
import { ScrollView, Text, View } from "react-native";

export default function RefundPolicyScreen() {
    const styles = useConfirmPaymentScreenStyles();

    const contents: Contents = [
        {
            title: "환불 신청 기간",
            content: "결제 취소는 결제된 시간 기준으로 48시간 이내에 \n취소가 가능합니다.",
        },
        {
            title: "환불 불가안내",
            content: "고객님의 단순변심으로 인한 환불 신청이 결제된 \n시간으로 48시간이 경과한 경우",
        },
        {
            title: "환불 안내",
            content: "결제 취소된 건에대해선 납부처리 되지 않으며, \n미납부 시 재안내 드리는 점 참고 바랍니다.",
        },
    ];

    return (
        <NavigationView
            headerOptions={{
                title: "환불 안내",
                hideBuidingSelector: true,
                navComponentProps: {
                    onPress: () => true,
                },
                style: {
                    borderBottomColor: styles.main.navContainer.backgroundColor,
                    backgroundColor: styles.main.navContainer.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.main.navContainer.backgroundColor,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            {contents.map((content, index) => {
                return (
                    <View key={index} style={styles.main.container}>
                        <Text style={styles.main.topText}>{content.title}</Text>
                        <Text style={styles.main.bottomText}>{content.content}</Text>
                    </View>
                );
            })}
        </NavigationView>
    );
}

type Contents = Array<Content>;
type Content = {
    title: string;
    content: string | number;
};
