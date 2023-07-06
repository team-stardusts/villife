import { Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useBottomEditModalStyles from "./style";
import ApprovalRequiredModalProps from "./type";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import HomeSideMoalProps from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";
import Icon from "../../../../common/atoms/icon";
import { IconSeries } from "../../../../common/atoms/icon/types";

export default function HomeSideMoal(props: HomeSideMoalProps) {
    const messages = useScreenMessage();
    const { deviceUI, theme } = useStyler();
    const styles = useBottomEditModalStyles();
    const { visible, setVisible } = props;

    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);

    useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const data: Array<{ name: IconSeries; size: number; color: string; title: string }> = [
        { name: "menu", size: deviceUI.moderateScale(30), color: theme.colorFamily.black, title: "value4" },
        { name: "person", size: deviceUI.moderateScale(30), color: theme.colorFamily.black, title: "value4" },
        { name: "building", size: deviceUI.moderateScale(30), color: theme.colorFamily.black, title: "value4" },
    ];

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={() => {
                setVisible(!props.visible);
            }}
            style={[styles.wrapper, styles.wrapperTop]}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoWrapper}>
                            <Icon name={"person"} size={deviceUI.moderateScale(80)} color="black" />
                            <View>
                                <Text>501호</Text>
                                <Text>최태성</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        {data.map((item, index) => (
                            <View key={index} style={styles.menu}>
                                <Icon name={item.name} size={item.size} color={item.color} />
                                <Text>{item.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <Pressable style={styles.wrapper} onPress={() => setVisible(false)} />
            </View>
        </Modal>
    );
}
