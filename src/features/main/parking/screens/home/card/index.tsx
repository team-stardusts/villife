import { View } from "react-native";
import { VehicleCardViewProps } from "./types";
import { useCallback, useEffect, useState } from "react";
import useVehicleCardViewStyles from "./styles";
import VehicleCardBottom from "./blocks/bottom";
import VehicleCardBody from "./blocks/body";
import TitleCard from "../../../../../common/blocks/title_card";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import EditBtnCombo from "./blocks/btn-combo";
import { VehicleModifyType } from "../../../blocks/modal/modify/types";
import VehicleModifyModal from "../../../blocks/modal/modify";

export default function VehicleCardView({ vehicles }: VehicleCardViewProps) {
    const messages = useScreenMessage().messages;

    const [crrIndex, setCrrIndex] = useState<number>(0);
    const [editmode, setEditmode] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editType, setEditType] = useState<VehicleModifyType | null>(null);

    const styles = useVehicleCardViewStyles();

    useEffect(() => {
        if (editType === null || vehicles.length === 0) return;
        setModalVisible(true);
    }, [editType]);

    const handlePressEditBtns = useCallback(
        (newEditType: VehicleModifyType) => {
            if (editType === newEditType) setModalVisible(true);
            else setEditType(newEditType);
        },
        [editType, vehicles]
    );

    return (
        <View style={styles.main.container}>
            <TitleCard
                title={messages.main.parking.home.my_vehicle_info}
                headerButton={
                    vehicles.length > 0 && vehicles.length !== crrIndex
                        ? {
                              title: "수정하기",
                              onPress: () => setEditmode(!editmode),
                          }
                        : undefined
                }>
                <View style={styles.main.wrapper}>
                    <View style={styles.main.bodyContainer}>
                        <VehicleCardBody styles={styles.body} vehicles={vehicles} onFlip={setCrrIndex} />
                    </View>
                    {editmode && vehicles.length >= crrIndex + 1 && (
                        <View style={styles.main.btncomboContainer}>
                            <EditBtnCombo styles={styles.btncombo} onPressEditBtn={handlePressEditBtns} />
                        </View>
                    )}
                    <View style={styles.main.bottomCotainer}>
                        <VehicleCardBottom
                            styles={styles.bottom}
                            length={vehicles.length + 1}
                            currentIndex={crrIndex}
                        />
                    </View>
                </View>
                {editType !== null && vehicles.length >= crrIndex + 1 && (
                    <VehicleModifyModal
                        modifyType={editType}
                        visible={modalVisible}
                        setVisible={setModalVisible}
                        vehilce={vehicles[crrIndex]}
                    />
                )}
            </TitleCard>
        </View>
    );
}
