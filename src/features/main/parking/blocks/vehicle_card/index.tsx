import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextBase, View } from "react-native";
import { VehicleCardProps, VehicleCardViewProps } from "./types";
import useStyler from "../../../../common/hooks/styler/hooks";
import { useEffect, useState } from "react";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ContentBox from "../../../../common/blocks/content_box";
import MiniContent from "../../../../common/blocks/mini_content";
import PageIndicators from "../../../../common/blocks/page_indicator";

function VehicleCard({ vehicle, cardWidth }: VehicleCardProps) {
    const { deviceUI, theme } = useStyler();
    const messages = useScreenMessage();

    const styles = StyleSheet.create({
        card: {
            width: cardWidth,
            height: "100%",
            overflow: "hidden",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(15),
        },
        rowWrapper: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: deviceUI.moderateScale(15),
        },
        rowText: {
            color: theme.colorFamily.white,
            fontWeight: "bold",
            ...theme.font.researved.h4,
        },
    });

    function CardRow({ rowKey, rowValue }: { rowKey: string; rowValue: string | number }) {
        return (
            <View style={styles.rowWrapper}>
                <Text style={styles.rowText}>{rowKey}</Text>
                <Text style={styles.rowText}>{rowValue}</Text>
            </View>
        );
    }

    const cardData: Array<{ rowKey: string; rowValue: string | number }> = [
        {
            rowKey: messages.messages.main.parking.home.plate_number,
            rowValue: vehicle.plate_number,
        },
        {
            rowKey: messages.messages.main.parking.home.vehicle_info,
            rowValue: vehicle.model,
        },
        {
            rowKey: messages.messages.main.parking.home.etd,
            rowValue: vehicle.etd,
        },
        {
            rowKey: messages.messages.main.parking.home.eta,
            rowValue: vehicle.eta,
        },
    ];

    return (
        <View style={styles.card}>
            {cardData.map((datum, index) => (
                <CardRow key={index} rowKey={datum.rowKey} rowValue={datum.rowValue} />
            ))}
        </View>
    );
}

export default function VehicleCardView({ vehicles, cardWidth }: VehicleCardViewProps) {
    const { deviceUI, theme } = useStyler();
    const [crrIndex, setCrrIndex] = useState<number>(0);

    const styles = StyleSheet.create({
        scrollview: {
            width: cardWidth,
            height: "85%",
        },
        indicatorBox: {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "15%",
        },
        registerCardBox: {
            width: cardWidth,
            justifyContent: "center",
            alignItems: "center",
        },
    });

    // ScrollView가 가로 상태일 때, 현재 페이지를 구함
    const getCurrentPage = (scollEvent: NativeSyntheticEvent<NativeScrollEvent>, scrollViewWidth: number): number => {
        // ScrollView width 값이 실제로 지정한 값 보다 근소하게 작게 적용되는 현상이 발생함.
        // 따라서, 인자로 받는 ScrollView의 Width의 95%의 수치만 사용함.
        scrollViewWidth *= 0.95;

        let index: number = parseInt((scollEvent.nativeEvent.contentOffset.x / scrollViewWidth).toString());

        if (index === -0) index = 0;

        return index;
    };

    return (
        <ContentBox>
            <ScrollView
                style={styles.scrollview}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                scrollEventThrottle={5}
                onScroll={(e) => setCrrIndex(getCurrentPage(e, cardWidth))}>
                {vehicles.map((vehicle, index) => (
                    <VehicleCard key={index} vehicle={vehicle} cardWidth={cardWidth} />
                ))}
                <View style={styles.registerCardBox}>
                    <Text>Register your vehicle!</Text>
                </View>
            </ScrollView>
            <View style={styles.indicatorBox}>
                {
                    // Register Card의 Indicator도 표현하기 위해 + 1
                }
                <PageIndicators length={vehicles.length + 1} currentIndex={crrIndex} size={deviceUI.moderateScale(7)} />
            </View>
        </ContentBox>
    );
}
