import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { VehicleCardProps, VehicleCardViewProps } from "./types";
import useStyler from "../../../../common/hooks/styler/hooks";
import { useState } from "react";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ContentBox from "../../../../common/blocks/content_box";
import PageIndicators from "../../../../common/blocks/page_indicator";
import Icon from "../../../../common/atoms/icon";
import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../../../../common/router/types";
import VehicleModifyModal from "../modify_modal";
import useParkService from "../../services/park";

function VehicleCard({ vehicle, cardWidth }: VehicleCardProps) {
    const { deviceUI, theme } = useStyler();
    const messages = useScreenMessage();
    const [deleteAlertVisible, setDeleteAlertVisible] = useState<boolean>(false);

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

    function CardRow({ rowKey, rowValue }: { rowKey: string; rowValue: string }) {
        return (
            <View style={styles.rowWrapper}>
                <Text style={styles.rowText}>{rowKey}</Text>
                <Text style={styles.rowText}>{rowValue}</Text>
            </View>
        );
    }

    const etdHour = vehicle.etd.getHours().toString();
    const etdMin = vehicle.etd.getMinutes().toString();
    const etaHour = vehicle.eta.getHours().toString();
    const etaMin = vehicle.eta.getMinutes().toString();

    const cardData: Array<{ rowKey: string; rowValue: string }> = [
        {
            rowKey: messages.messages.words.plate_number,
            rowValue: vehicle.plate_number,
        },
        {
            rowKey: messages.messages.words.vehicle_info,
            rowValue: vehicle.model,
        },
        {
            rowKey: messages.messages.words.etd,
            rowValue: `${etdHour.length === 1 ? 0 + etdHour : etdHour}:${etdMin.length === 1 ? 0 + etdMin : etdMin}`,
        },
        {
            rowKey: messages.messages.words.eta,
            rowValue: `${etaHour.length === 1 ? 0 + etaHour : etaHour}:${etaMin.length === 1 ? 0 + etaMin : etaMin}`,
        },
    ];

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.6} onPress={() => setDeleteAlertVisible(true)}>
            {cardData.map((datum, index) => (
                <CardRow key={index} rowKey={datum.rowKey} rowValue={datum.rowValue} />
            ))}
            <VehicleModifyModal
                initialVehicleInfo={vehicle}
                modalVisible={deleteAlertVisible}
                setModalVisible={setDeleteAlertVisible}
            />
        </TouchableOpacity>
    );
}

export default function VehicleCardView({ vehicles, cardWidth }: VehicleCardViewProps) {
    const messages = useScreenMessage();
    const navigation = useNavigation<RouterParams["navigation"]>();
    const { updateUserVehicleEtda, updateUserVehicleInfo } = useParkService();
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
        registerCardTitleWrapper: {
            justifyContent: "center",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(10),
        },
        registerCardTitle: {
            color: theme.colorFamily.white,
            ...theme.font.researved.h3,
        },
        registerCardSubtitle: {
            color: theme.colorFamily.white,
            ...theme.font.researved.h5,
        },
        registerIcon: {
            color: theme.colorFamily.white,
            width: deviceUI.moderateScale(80),
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

    const handlePressRegisterBtn = () => {
        navigation.navigate("register_vehicle");
    };

    //console.log("VehicleCards", vehicles[vehicles.length - 1]);

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
                <TouchableOpacity style={styles.registerCardBox} activeOpacity={0.6} onPress={handlePressRegisterBtn}>
                    {vehicles.length === 0 && (
                        <View style={styles.registerCardTitleWrapper}>
                            <Text style={styles.registerCardTitle}>
                                {messages.messages.main.parking.home.say_no_vehicle_info}
                            </Text>
                            <Text style={styles.registerCardSubtitle}>
                                {messages.messages.main.parking.home.induce_to_register_own_vehicle}
                            </Text>
                        </View>
                    )}
                    <Icon name="plus" size={styles.registerIcon.width} color={styles.registerIcon.color} />
                </TouchableOpacity>
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
