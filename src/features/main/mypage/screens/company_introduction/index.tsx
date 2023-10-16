import React, { useState } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { Text, View } from "react-native";
import CompanyIntroductionScreenProps from "./types";
import useCompanyIntroductionScreenStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import ScreenTitleView from "../../../../common/blocks/title_view";

export default function CompanyIntroductionScreen(props: CompanyIntroductionScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useCompanyIntroductionScreenStyles();
    const navigation = useNavigation<VillifeNavigation>();

    const handlePressOkayButton = () => {
        navigation.navigate("my_page");
    };

    const contents: Contents = [
        {
            title: "회사명",
            content: "(주)스타더스트",
        },
        {
            title: "대표자",
            content: "정지혜",
        },
        {
            title: "주소",
            content: "인천광역시 부평구 충선로8번길 31 1003호",
        },
        {
            title: "이메일",
            content: "corpstardust0726@gamil.com",
        },
        {
            title: "전화",
            content: "010-5502-7723",
        },
        {
            title: "사업자등록번호",
            content: "522-88-03029",
        },
    ];

    return (
        <NavigationView
            headerOptions={{
                title: "",
                shown: false,
            }}
            bodyOptions={{
                backgroundColor: styles.main.navContainer.color,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={["회사 소개하기"]}
                subtitles={[
                    "주식회사 스타더스트입니다.\n주택 관리 업체, 임대인들을 위한 빌라, 오피스텔\n관리 소프트웨어를 제공 드려 도움이 되고자 합니다.\n\n더 자세한 설명을 원하신다면 연락주세요.",
                ]}
                bottomButton={{
                    title: messages.words.okay,
                    onPress: () => handlePressOkayButton(),
                }}>
                <View style={styles.main.container}>
                    {contents.map((content, index) => {
                        return (
                            <View style={styles.main.childrenSection} key={index}>
                                <Text style={styles.main.leftText}>{content.title}</Text>
                                <Text
                                    style={
                                        index === 2 || index === 3 ? styles.main.rightSmallText : styles.main.rightText
                                    }>
                                    {content.content}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}

type Contents = Array<Content>;
type Content = {
    title: string;
    content: string | number;
};
