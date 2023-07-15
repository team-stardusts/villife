import { Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import useBottomEditModalStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import HomeSideMoalProps from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";
import Icon from "../../../../common/atoms/icon";
import { IconSeries } from "../../../../common/atoms/icon/types";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function HomeSideModal(props: HomeSideMoalProps) {
    const message = useScreenMessage();
    const userInfo = useUserInfoService();
    const { deviceUI, theme } = useStyler();
    const styles = useBottomEditModalStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const { visible, setVisible } = props;

    const renterData: Array<{ name: IconSeries; size: number; color: string; title: string; onPress: () => void }> = [
        {
            name: "speaker",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: message.messages.main.noti.screen_title,
            onPress: () => {
                setVisible(false);
                navigation.navigate("noti_home", {});
            },
        },
        {
            name: "question-mark",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: message.messages.main.complaint.frequently_reported_complaints,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
        },
        {
            name: "building",
            size: deviceUI.moderateScale(20),
            color: theme.colorFamily.black,
            title: message.messages.main.home.building_info,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
        },
        {
            name: "round-person",
            size: deviceUI.moderateScale(35),
            color: theme.colorFamily.black,
            title: message.messages.main.home.user_info,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
        },
    ];

    const adminData: Array<{ name: IconSeries; size: number; color: string; title: string; onPress: () => void }> = [
        {
            name: "speaker",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: message.messages.main.noti.screen_title,
            onPress: () => {
                setVisible(false);
                navigation.navigate("noti_home", {});
            },
        },
        {
            name: "letter",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: message.messages.main.approval.screen_title,
            onPress: () => {
                setVisible(false);
                navigation.navigate("approval_home", {});
            },
        },
        {
            name: "question-mark",
            size: deviceUI.moderateScale(40),
            color: theme.colorFamily.black,
            title: message.messages.main.complaint.frequently_reported_complaints,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
        },
        {
            name: "building",
            size: deviceUI.moderateScale(20),
            color: theme.colorFamily.black,
            title: message.messages.main.home.building_info,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
        },
        {
            name: "round-person",
            size: deviceUI.moderateScale(35),
            color: theme.colorFamily.black,
            title: message.messages.main.home.user_info,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
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
                                  <TouchableOpacity key={index} onPress={() => item.onPress()}>
                                      <View style={styles.menu}>
                                          <Icon name={item.name} size={item.size} color={item.color} />
                                          <Text style={styles.menuText}>{item.title}</Text>
                                      </View>
                                  </TouchableOpacity>
                              ))
                            : adminData.map((item, index) => (
                                  <TouchableOpacity key={index} onPress={() => item.onPress()}>
                                      <View style={styles.menu}>
                                          <Icon name={item.name} size={item.size} color={item.color} />
                                          <Text style={styles.menuText}>{item.title}</Text>
                                      </View>
                                  </TouchableOpacity>
                              ))}
                    </View>
                </View>
                <Pressable style={styles.wrapper} onPress={() => setVisible(false)} />
            </View>
        </Modal>
    );
}
