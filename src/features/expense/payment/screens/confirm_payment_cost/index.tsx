import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useConfirmPaymentScreenStyles from "./styles";
import ConfirmPaymentCostScreenProps from "./types";
import { ScrollView, Text, View } from "react-native";

export default function ConfirmPaymentCostScreen({ navigation, route }: ConfirmPaymentCostScreenProps) {
    const costType = route.params.product_type === "pt_management_fee" ? "관리비" : "월세";
    const bill = route.params.bill;
    const styles = useConfirmPaymentScreenStyles();

    const insertCommaToMoney = (money: number): string => {
        //if (money === undefined || money === null) return "-";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <NavigationView
            headerOptions={{
                title: "결제하기",
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
            <ScreenTitleView
                titles={[`${costType} 결제하기`]}
                subtitles={["내역과 중개수수료를 확인하고 결제해주세요."]}
                bottomButton={{
                    title: "결제하기",
                    onPress: () => console.log("HELLO"),
                }}
                disablePaddingTop>
                <View style={styles.main.container}>
                    <View style={styles.main.priceContainer}>
                        <Text style={styles.main.price}>{insertCommaToMoney(route.params.price)} 원</Text>
                    </View>
                    <ScrollView style={styles.main.billContainer}>
                        {bill !== undefined &&
                            Object.keys(bill).map((billKey, index) => (
                                <View key={index} style={styles.main.billRow}>
                                    <Text style={styles.main.billKey}>{billKey}</Text>
                                    <Text style={styles.main.billRow}>{insertCommaToMoney(bill[billKey])} 원</Text>
                                </View>
                            ))}
                    </ScrollView>
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}
