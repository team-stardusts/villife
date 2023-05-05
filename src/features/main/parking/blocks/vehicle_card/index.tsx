import { ScrollView, StyleSheet, Text, View } from "react-native";
import { VehicleCardProps, VehicleCardViewProps } from "./types";
import MiniContent from "../../../../common/blocks/mini_content";
import useStyler from "../../../../common/hooks/styler/hooks";
import { useState } from "react";

function VehicleCard({ vehicle, cardWidth }: VehicleCardProps) {
    const { deviceUI, theme } = useStyler();

    const style = StyleSheet.create({
        card: {
            width: cardWidth,
            height: "100%",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <View style={style.card}>
            <Text>{vehicle.plate_number}</Text>
            <Text>{vehicle.model}</Text>
            <Text>{vehicle.eta}</Text>
            <Text>{vehicle.etd}</Text>
        </View>
    );
}

export default function VehicleCardView({ title, vehicles, cardWidth }: VehicleCardViewProps) {
    const { deviceUI, theme } = useStyler();
    const [crrIndex, setCrrIndex] = useState<number>(0);

    const style = StyleSheet.create({
        scrollview: {
            width: cardWidth,
            height: "85%",
        },
        indicatorBox: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "15%",
        },
        indicator: {
            width: deviceUI.moderateScale(8),
            height: deviceUI.moderateScale(8),
            borderRadius: deviceUI.moderateScale(8),
            marginHorizontal: deviceUI.moderateScale(2),
            //backgroundColor: theme.colorFamily.white,
        },
    });

    return (
        <MiniContent title={title}>
            <ScrollView style={style.scrollview} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                {vehicles.map((vehicle, index) => (
                    <VehicleCard key={index} vehicle={vehicle} cardWidth={cardWidth} />
                ))}
            </ScrollView>
            <View style={style.indicatorBox}>
                {Array(vehicles.length)
                    .fill(null)
                    .map((value, index) => (
                        <View
                            key={index}
                            style={[
                                style.indicator,
                                {
                                    backgroundColor:
                                        crrIndex === index ? theme.colorFamily.white : theme.colorFamily.grey,
                                },
                            ]}
                        />
                    ))}
            </View>
        </MiniContent>
    );
}
