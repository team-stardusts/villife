import { Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import useBottomEditModalStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import HomeSideMoalProps from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";
import Icon from "../../../../common/atoms/icon";
import { IconSeries } from "../../../../common/atoms/icon/types";
import useUserInfoService from "../../../../common/hooks/service/user_info";

export default function HomeSideMoal(props: HomeSideMoalProps) {
    const messages = useScreenMessage();
    const userInfo = useUserInfoService();
    const { deviceUI, theme } = useStyler();
    const styles = useBottomEditModalStyles();
    const { visible, setVisible } = props;

    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);

    useEffect(() => {
        if (!props.visible) setDeleteAlertVisible(false);
    }, []);

    const renterData: Array<{ name: IconSeries; size: number; color: string; title: string }> = [
        {
            name: "menu",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: messages.messages.main.noti.screen_title,
        },
        {
            name: "person",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: messages.messages.main.complaint.frequently_reported_complaints,
        },
        {
            name: "building",
            size: deviceUI.moderateScale(20),
            color: theme.colorFamily.black,
            title: messages.messages.main.home.building_info,
        },
        {
            name: "round_person",
            size: deviceUI.moderateScale(35),
            color: theme.colorFamily.black,
            title: messages.messages.main.home.user_info,
        },
    ];

    const adminData: Array<{ name: IconSeries; size: number; color: string; title: string }> = [
        {
            name: "menu",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: messages.messages.main.noti.screen_title,
        },
        {
            name: "letter",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: messages.messages.main.approval.screen_title,
        },
        {
            name: "person",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: messages.messages.main.complaint.frequently_reported_complaints,
        },
        {
            name: "building",
            size: deviceUI.moderateScale(20),
            color: theme.colorFamily.black,
            title: messages.messages.main.home.building_info,
        },
        {
            name: "round_person",
            size: deviceUI.moderateScale(35),
            color: theme.colorFamily.black,
            title: messages.messages.main.home.user_info,
        },
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
                                <Text>{userInfo.adminInfo?.selectedBuilding.id}</Text>
                                <Text>{userInfo.basicInfo?.name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        {userInfo.basicInfo?.authority !== undefined && userInfo.basicInfo?.authority == 1
                            ? renterData.map((item, index) => (
                                  <View key={index} style={styles.menu}>
                                      <Icon name={item.name} size={item.size} color={item.color} />
                                      <Text style={styles.menuText}>{item.title}</Text>
                                  </View>
                              ))
                            : adminData.map((item, index) => (
                                  <View key={index} style={styles.menu}>
                                      <Icon name={item.name} size={item.size} color={item.color} />
                                      <Text style={styles.menuText}>{item.title}</Text>
                                  </View>
                              ))}
                    </View>
                </View>
                <Pressable style={styles.wrapper} onPress={() => setVisible(false)} />
            </View>
        </Modal>
    );
}
