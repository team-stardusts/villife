import React, { useState } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { View } from "react-native";
import MyPageHomeScreenProps from "./types";
import useMyPageHomeScreenStyles from "./styles";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import useLogoutService from "../../services/logout";
import MyPanel from "./blocks/mypanel";
import ScrollNav from "./blocks/scrollnav";

export default function MyPageHomeScreen(props: MyPageHomeScreenProps) {
    const message = useScreenMessage();
    const styles = useMyPageHomeScreenStyles();
    const logout = useLogoutService().logout;
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: "정말로 로그아웃 하시겠습니까?",
        visible: false,
        buttons: [
            {
                text: "취소",
                onPress: () => cancleLogout(),
            },
            {
                text: "로그아웃",
                onPress: () => logout(),
            },
        ],
    });

    const cancleLogout = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.mypage.screen_title,
                style: {
                    borderBottomColor: styles.main.navContainer.color,
                    backgroundColor: styles.main.navContainer.color,
                },
                navComponent: SimpleNavComponent,
                navComponentProps: {
                    title: "로그아웃",
                    onPress: () => setAlert({ ...alert, visible: true }),
                },
            }}
            bodyOptions={{
                backgroundColor: styles.main.navContainer.color,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.main.container}>
                <StardustAlert {...alert} setAlert={setAlert} />
                <MyPanel styles={styles.mypanel} />
                <ScrollNav styles={styles.scrollNav} />
            </View>
        </NavigationView>
    );
}
