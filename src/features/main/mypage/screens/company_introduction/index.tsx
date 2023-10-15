import React, { useState } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { View } from "react-native";
import SimpleNavComponent from "../../../../common/blocks/navigation/header/navcomponent";
import CompanyIntroductionScreenProps from "./types";
import useCompanyIntroductionScreenStyles from "./styles";

export default function CompanyIntroductionScreen(props: CompanyIntroductionScreenProps) {
    const message = useScreenMessage();
    const styles = useCompanyIntroductionScreenStyles();

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
                },
            }}
            bodyOptions={{
                backgroundColor: styles.main.navContainer.color,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.main.container}></View>
        </NavigationView>
    );
}
