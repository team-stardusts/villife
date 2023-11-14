import { View } from "react-native";
import { VehicleCardViewProps } from "./types";
import { useEffect, useState } from "react";
import ContentBox from "../../../../../common/blocks/content_box";
import useVehicleCardViewStyles from "./styles";
import VehicleCardBottom from "./blocks/bottom";
import VehicleCardHeader from "./blocks/header";
import VehicleCardBody from "./blocks/body";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../../common/constants";
import useStyler from "../../../../../common/hooks/styler/hooks";
import TitleCard from "../../../../../common/blocks/title_card";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";

export default function VehicleCardView({ vehicles }: VehicleCardViewProps) {
    const { deviceUI } = useStyler();
    const messages = useScreenMessage().messages;
    const innerPadding = deviceUI.moderateScale(40);
    const screenPadding = deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE) * 2;

    const cardWidth: number = deviceUI.getScreenSize().width - (screenPadding + innerPadding);

    const [crrIndex, setCrrIndex] = useState<number>(0);
    const [editmode, setEditmode] = useState<boolean>(false);

    const styles = useVehicleCardViewStyles(editmode);

    return (
        <TitleCard
            title={messages.main.parking.home.my_vehicle_info}
            headerButton={
                vehicles.length === 0
                    ? undefined
                    : {
                          title: "수정하기",
                          onPress: () => setEditmode(!editmode),
                      }
            }>
            <View style={styles.main.wrapper}>
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
        </TitleCard>
    );
}

{
    /* <ContentBox backgroundColor={styles.main.contentBox.backgroundColor}>
                <View style={styles.main.wrapper}>
                    <View style={styles.main.headerContainer}>
                        <VehicleCardHeader
                            styles={styles.header}
                            numberOfVehicle={vehicles.length}
                            onIntoEditmode={setEditmode}
                        />
                    </View>
                </View>
            </ContentBox> */
}
