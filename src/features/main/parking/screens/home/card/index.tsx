import { Text, View } from "react-native";
import { VehicleCardViewProps } from "./types";
import { useEffect, useState } from "react";
import ContentBox from "../../../../../common/blocks/content_box";
import useVehicleCardViewStyles from "./styles";
import VehicleCardBottom from "./blocks/bottom";
import VehicleCardHeader from "./blocks/header";
import VehicleCardBody from "./blocks/body";
import DeviceUiInfo from "../../../../../../libs/device";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../../common/constants";

export default function VehicleCardView({ vehicles }: VehicleCardViewProps) {
    const innerPadding = DeviceUiInfo.moderateScale(40);
    const screenPadding = SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE * 2;

    const cardWidth: number = DeviceUiInfo.getScreenSize().width - (screenPadding + innerPadding);

    const [crrIndex, setCrrIndex] = useState<number>(0);
    const [editmode, setEditmode] = useState<boolean>(false);

    const styles = useVehicleCardViewStyles(editmode);

    return (
        <View style={styles.main.container}>
            <ContentBox backgroundColor={styles.main.contentBox.backgroundColor}>
                <View style={styles.main.wrapper}>
                    <View style={styles.main.headerContainer}>
                        <VehicleCardHeader
                            styles={styles.header}
                            numberOfVehicle={vehicles.length}
                            onIntoEditmode={setEditmode}
                        />
                    </View>
                    <View style={styles.main.bodyContainer}>
                        <VehicleCardBody
                            styles={styles.body}
                            cardWidth={cardWidth}
                            vehicles={vehicles}
                            isEditmode={editmode}
                            onFlip={setCrrIndex}
                        />
                    </View>
                    <View style={styles.main.bottomCotainer}>
                        <VehicleCardBottom styles={styles.bottom} length={vehicles.length} currentIndex={crrIndex} />
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
