import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import HomeScreenProps from "./type";
import useHomeScreenStyles from "./styles";
import HomeContentFromComplaint from "../../../complaint/blocks/home_content";
import HomeContentFromParking from "../../../parking/blocks/home_content";
import HomeContentFromNoti from "../../../noti/blocks/home_content";
import useUserInformation from "../../../../common/hooks/service/user_info";
import HomeContentFromManagementFee from "../../../../expense/management_fee/blocks/home_content";
import NotiBoxShortcut from "../../blocks/noti-box";
import HomeContentApproval from "./approval";

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
    const messages = useScreenMessage();
    const styles = useHomeScreenStyles();
    const user = useUserInformation();
    const contents = useMemo<(() => JSX.Element)[]>(() => {
        if (user === null) return [];

        if (user.isAdmin)
            return [HomeContentApproval, HomeContentFromNoti, HomeContentFromComplaint, HomeContentFromParking];

        return [HomeContentFromManagementFee, HomeContentFromNoti, HomeContentFromParking, HomeContentFromComplaint];
    }, [user?.authority, user?.adminInfomation?.selectedBuilding]);

    //HomeContentFromManagementFee

    console.log("[HomeScreen] onCreate");

    //const contents = [HomeContentFromComplaint, HomeContentFromNoti, HomeContentFromParking];

    useEffect(() => {
        if (user?.isAdmin && (user.adminInfomation?.managedBuildings?.length as any) === 0) {
            navigation.reset({
                index: 0,
                routes: [{ name: "building_addition_guide" }],
            });
        }
    }, [user?.adminInfomation?.managedBuildings]);

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.home.screen_title,
                navComponent: NotiBoxShortcut,

                /* navComponentProps: {
                    iconName: "speaker",
                    title: messages.messages.main.noti.screen_title,
                    onPress: () => {
                        navigation.navigate("noti_home");
                    },
                }, */
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}>
                <ScrollView style={styles.contentsScrollBox} showsVerticalScrollIndicator={false}>
                    {contents.map((Content, index) => (
                        <Content key={index} />
                    ))}
                </ScrollView>
            </View>
        </NavigationView>
    );
}
