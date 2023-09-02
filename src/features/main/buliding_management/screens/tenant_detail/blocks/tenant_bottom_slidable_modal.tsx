import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../../../../../common/blocks/universial/slidemodal_bottom";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { IconSeries } from "../../../../../common/atoms/icon/types";
import Icon from "../../../../../common/atoms/icon";

export default function TenantBottomSlidableModal(props: TenantNoticeModalProps) {
    const styles = useTenantNoticeModalStyles();
    const rowHeight = (styles.row.height + styles.row.marginBottom) * 1.4;

    return (
        <BottomSlidableModal
            height={rowHeight * props.features.length}
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}>
            <View style={styles.container}>
                {props.features.map((feature, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.row}
                        activeOpacity={0.6}
                        onPress={() => feature.onPress()}>
                        <View style={styles.iconBox}>
                            <Icon name={feature.icon} size={styles.icon.width} color={styles.icon.color} />
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.text}>{feature.text}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </BottomSlidableModal>
    );
}

type TenantNoticeModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    features: ModalFeature[];
};

export type ModalFeature = {
    icon: IconSeries;
    text: string;
    onPress(): void;
};

function useTenantNoticeModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            marginTop: deviceUI.moderateScale(10),
        },
        row: {
            width: "100%",
            height: deviceUI.moderateScale(50),
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: deviceUI.moderateScale(30),
            marginBottom: deviceUI.moderateScale(5),
        },
        iconBox: {
            justifyContent: "center",
            alignItems: "center",
            marginRight: deviceUI.moderateScale(15),
        },
        icon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        trashCanIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        textBox: {
            justifyContent: "center",
        },
        text: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
    });
}
