import NoticeHomeScreenProps from "./type";
import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useStyler from "../../../../common/hooks/styler/hooks";
import { View, Text } from "react-native";
import { IconPerson } from "../../../../common/atoms/icon/human";
import useMyPageHomeScreenStyles from "./style";

export default function MyPageHomeScreen(props: NoticeHomeScreenProps) {
    const styles = useMyPageHomeScreenStyles();
    const message = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: message.messages.main.mypage.screen_title,
            }}
            bodyOptions={{ applyDefaultHorizontalPadding: false, applyDefaultVerticalPadding: false }}>
            <View style={styles.topLevelBox}>
                <View style={styles.infoContainer}>
                    <View style={styles.leftContainer}>
                        <IconPerson size={styles.humanIconSize.width as number} />
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonContainerText}>내 정보 관리</Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.rightContainerTitleText}>김준우</Text>
                        <Text style={styles.rightContainerSubText}>그린파크 501호</Text>
                        <Text style={styles.rightContainerSubText}>BMW 120I / 108라 8477</Text>
                        <Text style={styles.rightContainerSubText}>2022-04-05 ~ 2024-04-05</Text>
                    </View>
                </View>
                <View style={styles.serviceContainer}>
                    <Text style={styles.serviceContainerText}>내 동네 설정</Text>
                    <Text style={styles.serviceContainerText}>내 동네 설정</Text>
                    <Text style={styles.serviceContainerText}>내 동네 설정</Text>
                </View>
            </View>
        </NavigationView>
    );
}
