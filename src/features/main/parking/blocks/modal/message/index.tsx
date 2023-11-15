import { BottomMessageSelectionModalProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../../common/router/types";
import { ModalFeature } from "../../../../../common/blocks/modal/bottom_list/types";
import ListBottomSlidableModal from "../../../../../common/blocks/modal/bottom_list";

export default function BottomMessageSelectionModal(props: BottomMessageSelectionModalProps) {
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();

    const features: ModalFeature[] = [
        {
            icon: "letter",
            text: "이중주차를 했어요.",
            onPress: () => {
                navigation.push("send_park_push_noti", { vehicleID: props.vehicleID, messageType: "double_parking" });
                props.setVisible(false);
            },
        },
        {
            icon: "letter",
            text: "주차 위치를 바꾸고 싶어요.",
            onPress: () => {
                navigation.push("send_park_push_noti", { vehicleID: props.vehicleID, messageType: "change_request" });
                props.setVisible(false);
            },
        },
    ];

    return (
        <ListBottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            //height={styles.main.container.height}
            features={features}
        />
    );
}
