import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { VehicleCardBodyProps } from "../types";
import VehicleCard from "./card";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../common/router/types";

export default function VehicleCardBody(props: VehicleCardBodyProps) {
    //const messages = useScreenMessage().messages;
    const navigation = useNavigation<VillifeNavigation>();

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
        <View style={props.styles.container}>
            <ScrollView
                style={[props.styles.scrollview, { width: props.styles.card.width }]}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                scrollEventThrottle={5}
                onScroll={(e) => props.onFlip(getCurrentPage(e, props.styles.card.width))}>
                {props.vehicles?.map((vehicle, index) => (
                    <VehicleCard key={index} vehicle={vehicle} cardWidth={props.styles.card.width} />
                ))}
                {props.requestedVehicles.map((value, index) => (
                    <View key={index} style={props.styles.additionalCardConatiner}>
                        <Text style={props.styles.waitingTitle} adjustsFontSizeToFit numberOfLines={1}>
                            관리자의 승인을 기다리고 있어요!
                        </Text>
                        <Text style={props.styles.waitingSubtitle} adjustsFontSizeToFit numberOfLines={1}>
                            {value.vehicleModel} / {value.plateNumber}
                        </Text>
                    </View>
                ))}
                <TouchableOpacity
                    style={props.styles.additionalCardConatiner}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("register_vehicle")}>
                    {props.vehicles.length === 0 && props.requestedVehicles.length === 0 ? (
                        <>
                            <Text style={props.styles.noCardTitle} adjustsFontSizeToFit numberOfLines={1}>
                                등록된 차량이 없어요!
                            </Text>
                            <Text style={props.styles.noCardSubtitle} adjustsFontSizeToFit numberOfLines={2}>
                                여기를 눌러서 차량을 등록해보세요.
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={props.styles.noCardTitle} adjustsFontSizeToFit numberOfLines={1}>
                                추가로 등록할 차량이 있으신가요?
                            </Text>
                            <Text style={props.styles.noCardSubtitle} adjustsFontSizeToFit numberOfLines={2}>
                                여기를 눌러 더 많은 차량을 등록해보세요.
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
