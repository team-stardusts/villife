import { ScrollView, StyleSheet, Text, View } from "react-native";
import { VehicleCardProps, VehicleCardViewProps } from "./types";
import MiniContent from "../../../../common/blocks/mini_content";
import useStyler from "../../../../common/hooks/styler/hooks";

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

    const style = StyleSheet.create({
        scrollview: {
            width: cardWidth,
            //backgroundColor: "red",
            height: "95%",
        },
        indicator: {
            //position: "absolute",
            width: deviceUI.moderateScale(10),
            height: deviceUI.moderateScale(10),
            borderRadius: deviceUI.moderateScale(10),
            backgroundColor: theme.colorFamily.white,
        },
    });

    return (
        <MiniContent title={title}>
            <ScrollView style={style.scrollview} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                {vehicles.map((vehicle, index) => (
                    <VehicleCard key={index} vehicle={vehicle} cardWidth={cardWidth} />
                ))}
            </ScrollView>
            <View style={style.indicator} />
        </MiniContent>
    );
}
