import { View } from "react-native";
import PageIndicator from "../../../../../../common/blocks/page_indicator";
import { VehicleCardBottomProps } from "../types";

export default function VehicleCardBottom({ styles, length, currentIndex }: VehicleCardBottomProps) {
    return (
        <View style={styles.cotainer}>
            <PageIndicator
                length={length}
                currentIndex={currentIndex}
                size={styles.indicator.width}
                activeColor={styles.indicator.color}
                deactiveColor={styles.indicatorDeactive.color}
            />
        </View>
    );
}
