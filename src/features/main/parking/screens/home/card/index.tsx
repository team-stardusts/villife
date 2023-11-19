import { View } from "react-native";
import { VehicleCardViewProps } from "./types";
import { useCallback, useEffect, useMemo, useState } from "react";
import useVehicleCardViewStyles from "./styles";
import VehicleCardBottom from "./blocks/bottom";
import VehicleCardBody from "./blocks/body";
import TitleCard from "../../../../../common/blocks/title_card";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import EditBtnCombo from "./blocks/btn-combo";
import { VehicleModifyType } from "../../../blocks/modal/modify/types";
import VehicleModifyModal from "../../../blocks/modal/modify";

export default function VehicleCardView(params: VehicleCardViewProps) {
    const messages = useScreenMessage().messages;
    const [crrIndex, setCrrIndex] = useState<number>(0);
    const [editmode, setEditmode] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editType, setEditType] = useState<VehicleModifyType | null>(null);
    const cardsCount = useMemo(() => params.vehicles.length + params.requestedVehicles?.length + 1, [params]);

    const styles = useVehicleCardViewStyles();

    useEffect(() => {
        if (editType === null || params.vehicles.length === 0) return;
        setModalVisible(true);
    }, [editType]);

    const handlePressEditBtns = useCallback(
        (newEditType: VehicleModifyType) => {
            if (editType === newEditType) setModalVisible(true);
            else setEditType(newEditType);
        },
        [editType, params.vehicles]
    );

    return (
        <View style={styles.main.container}>
            <TitleCard
                title={messages.main.parking.home.my_vehicle_info}
                headerButton={
                    params.vehicles.length > 0 && params.vehicles.length > crrIndex
                        ? {
                              title: "수정하기",
                              onPress: () => setEditmode(!editmode),
                          }
                        : undefined
                }>
                <View style={styles.main.wrapper}>
                    <View style={styles.main.bodyContainer}>
                        <VehicleCardBody
                            styles={styles.body}
                            vehicles={params.vehicles}
                            requestedVehicles={params.requestedVehicles}
                            onFlip={setCrrIndex}
                        />
                    </View>
                    {editmode && params.vehicles.length > crrIndex && (
                        <View style={styles.main.btncomboContainer}>
                            <EditBtnCombo styles={styles.btncombo} onPressEditBtn={handlePressEditBtns} />
                        </View>
                    )}
                    <View style={styles.main.bottomCotainer}>
                        <VehicleCardBottom styles={styles.bottom} length={cardsCount} currentIndex={crrIndex} />
                    </View>
                </View>
                {editType !== null && params.vehicles.length > crrIndex && (
                    <VehicleModifyModal
                        modifyType={editType}
                        visible={modalVisible}
                        setVisible={setModalVisible}
                        vehilce={params.vehicles[crrIndex]}
                    />
                )}
            </TitleCard>
        </View>
    );
}
