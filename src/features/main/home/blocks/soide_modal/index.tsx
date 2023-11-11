import { Alert, ColorValue, Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import useBottomEditModalStyles from "./style";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import HomeSideMoalProps, { RenderData } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";
import Icon from "../../../../common/atoms/icon";
import { IconSeries } from "../../../../common/atoms/icon/types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function HomeSideModal(props: HomeSideMoalProps) {
    const message = useScreenMessage();
    const user = useUserInformation();
    const { deviceUI, theme } = useStyler();
    const styles = useBottomEditModalStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const { visible, setVisible } = props;

    useEffect(() => {
        if (user === null) {
            VillifeToastMessage.showBottomToast("error", "사용자 정보를 읽을 수 없습니다. 다시 로그인 해주세요.");
            setVisible(false);
        }
    }, [user]);

    const renterData: RenderData = [
        {
            name: "speaker",
            size: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
            title: message.messages.main.noti.screen_title,
            onPress: () => {
                setVisible(false);
                navigation.navigate("noti_home", {});
            },
        },
        {
            name: "question-mark",
            size: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
            title: message.messages.main.complaint.frequently_reported_complaints,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
        },
        {
            name: "building",
            size: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
            title: message.messages.main.home.building_info,
            onPress: () => {
                setVisible(false);
                if (user === null) return;

                let isIvalid: boolean = false;
                let alertTitle: string = "건물의 정보를 조회할 수 없습니다.";
                let alertMessage: string | undefined = undefined;

                if (user?.buildingID === undefined) {
                    isIvalid = true;
                    alertMessage = "등록된 건물이 없거나 시스템 오류일 수 있습니다.";
                } else if (user.buildingID === 0) {
                    isIvalid = true;
                    alertMessage = "등록된 건물이 없습니다. 등록 후 사용해주세요!";
                }

                if (isIvalid) {
                    Alert.alert(alertTitle, alertMessage, [
                        {
                            text: "확인",
                        },
                    ]);

                    return;
                }

                navigation.navigate("building_info", {
                    buildingID: user.buildingID as number,
                    isAdmin: user.isAdmin,
                });
            },
        },
        {
            name: "round-person",
            size: deviceUI.moderateScale(35),
            color: theme.color.specified.black,
            title: message.messages.main.home.user_info,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
        },
    ];

    const adminData: RenderData = [
        {
            name: "speaker",
            size: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
            title: message.messages.main.noti.screen_title,
            onPress: () => {
                setVisible(false);
                navigation.navigate("noti_home", {});
            },
        },
        {
            name: "letter",
            size: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
            title: message.messages.main.approval.screen_title,
            onPress: () => {
                setVisible(false);
                navigation.navigate("approval_home", {});
            },
        },
        {
            name: "question-mark",
            size: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
            title: message.messages.main.complaint.frequently_reported_complaints,
            onPress: () => {
                setVisible(false);
                VillifeToastMessage.showBottomToast("error", message.messages.boilerplate.preparing_service);
            },
        },
        {
            name: "building",
            size: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
            title: message.messages.main.home.building_info,
            onPress: () => {
                setVisible(false);
                if (user === null) return;

                const buildingID = user?.adminInfomation?.selectedBuilding.id;
                let isIvalid: boolean = false;
                let alertTitle: string = "건물의 정보를 조회할 수 없습니다.";
                let alertMessage: string | undefined = undefined;

                if (buildingID === undefined) {
                    isIvalid = true;
                    alertMessage = "등록된 건물이 없거나 시스템 오류일 수 있습니다.";
                } else if (buildingID === 0) {
                    isIvalid = true;
                    alertMessage = "빌라이프에 문의해주세요.";
                }

                if (isIvalid) {
                    Alert.alert(alertTitle, alertMessage, [
                        {
                            text: "확인",
                        },
                    ]);

                    return;
                }

                navigation.navigate("building_info", {
                    buildingID: buildingID as number,
                    isAdmin: user.isAdmin,
                });
            },
        },
        {
            name: "round-person",
            size: deviceUI.moderateScale(35),
            color: theme.color.specified.black,
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
                                <Text style={styles.infoText} adjustsFontSizeToFit numberOfLines={1}>
                                    {user?.isAdmin
                                        ? user?.adminInfomation?.selectedBuilding.name
                                        : `${user?.roomNumber}호`}
                                </Text>
                                <Text style={styles.infoText} adjustsFontSizeToFit numberOfLines={1}>
                                    {user?.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        {user?.isRenter
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
                                          <View style={styles.menuIconBox}>
                                              <Icon name={item.name} size={item.size} color={item.color} />
                                          </View>
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
