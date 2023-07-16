import { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, Text, LogBox, Alert } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../blocks/bottom_button";
import AuthScreenCommonInput from "../../blocks/input";
import AuthScreenTitleView from "../../blocks/title_view";
import useSetBuildingScreenStyles from "./styles";
import SetBuildingScreenProps from "./types";
import SelectedAddressStateType from "../../../common/hooks/states/atoms/address/selected_address/types";
import { useRecoilState } from "recoil";
import selectedAddressState from "../../../common/hooks/states/atoms/address/selected_address";
import useValidateResidenceService from "../../services/set_building/index";
import { BuildingInfo } from "../../services/set_building/type";
import Badge from "../../../common/atoms/badge";
import IStringValidator from "../../../../libs/string_validator/types";
import StringValidator from "../../../../libs/string_validator";

LogBox.ignoreLogs(["Did not receive response to shouldStartLoad in time"]);

type BadgeStatus = {
    title: string;
    isValid: boolean;
};

export default function SetBuildingScreen({ navigation, route }: SetBuildingScreenProps) {
    const messages = useScreenMessage();
    const styles = useSetBuildingScreenStyles();

    const [address, setAddress] = useRecoilState<SelectedAddressStateType>(selectedAddressState);
    const [buildingInfo, setBuildingInfo] = useState<BuildingInfo | null>(null);

    const [roomNumber, setRoomNumber] = useState<string | null>(null);
    const [IsEditMode, setIsEditMode] = useState<boolean>(false);
    const [addressBadgeStatus, setAddressBadgeStatus] = useState<BadgeStatus>({
        title: "",
        isValid: false,
    });
    const [roomNumberBadgeStatus, setRoomNumberBadgeStatus] = useState<BadgeStatus>({
        title: "숫자",
        isValid: false,
    });

    const validateService = useValidateResidenceService();
    const validator: IStringValidator = new StringValidator();

    const onPressNextButton = async () => {
        console.log("building : ", buildingInfo, roomNumber);
        if (!buildingInfo) return Alert.alert("오류", "유효하지 않은 건물입니다."); // TO DO:: 문구 및 표시 방식 수정 필요

        if (!roomNumber) return Alert.alert("오류", "호수 정보를 입력해주세요");
        validateService
            .RequestValidationOfUserRegidence({
                building_id: buildingInfo.building_id,
                room_number: parseInt(roomNumber),
            })
            .then((r) => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "home", params: {} }],
                });
            })
            .catch((r) => {
                return Alert.alert("오류", "거주 인증 실패");
            });
    };

    useEffect(() => {
        if (roomNumber !== null) {
            setRoomNumberBadgeStatus({ ...roomNumberBadgeStatus, isValid: validator.isNumber(roomNumber) });
        }
    }, [roomNumber]);

    useEffect(() => {
        if (address) setIsEditMode(true);
    }, [address, roomNumber]);

    useEffect(() => {
        setAddressBadgeStatus({
            ...addressBadgeStatus,
            title: address?.roadAddress != "" && buildingInfo != null ? "등록된 빌라" : "미등록 빌라",
            isValid: address?.roadAddress != "" && buildingInfo != null,
        });
    }, [buildingInfo]);

    // 주소 확인 작업
    useEffect(() => {
        if (address == null) return;
        validateService
            .VerifyBuildingAddress({ address: address.roadAddress })
            .then((r) => {
                setBuildingInfo(r);
            })
            .catch((r) => {
                setBuildingInfo(null);
                console.log(r);
            });
    }, [address]);

    // Selected address 초기화
    useEffect(() => {
        setAddress(null);
    }, []);

    return (
        <SafeAreaView style={styles.main.container}>
            <View style={styles.main.screenWrapper}>
                <AuthScreenTitleView
                    title={messages.messages.auth.set_building.title}
                    subtitles={[messages.messages.auth.set_building.subtitle]}
                />
                <View style={styles.main.contentsWrapper}>
                    <View style={styles.input.container}>
                        <View style={styles.input.inputBox}>
                            <AuthScreenCommonInput
                                title={messages.messages.auth.set_building.adress_input_title}
                                placeholder={messages.messages.auth.set_building.adress_input_placeholder}
                                name="address"
                                onPressIn={() => navigation.navigate("search_address", {})}
                                value={address?.roadAddress ?? ""}
                            />
                        </View>
                        <View style={styles.input.addressBadgeBox}>
                            <Badge
                                title={addressBadgeStatus.title}
                                color={
                                    addressBadgeStatus.isValid
                                        ? styles.input.validBadge.color
                                        : styles.input.invalidBadge.color
                                }
                                bgColor={
                                    addressBadgeStatus.isValid
                                        ? styles.input.validBadge.backgroundColor
                                        : styles.input.invalidBadge.backgroundColor
                                }
                                size={styles.input.validBadge.width}
                            />
                        </View>
                        <View style={styles.input.inputBox}>
                            <AuthScreenCommonInput
                                title={messages.messages.auth.set_building.room_number_input_title}
                                placeholder={messages.messages.auth.set_building.room_number_input_placeholder}
                                name="room_number"
                                onChangeText={(text, name) => {
                                    setRoomNumber(text);
                                }}
                            />
                        </View>
                        <View style={styles.input.roomNumberBadgeBox}>
                            <Badge
                                title={roomNumberBadgeStatus.title}
                                color={
                                    roomNumberBadgeStatus.isValid
                                        ? styles.input.validBadge.color
                                        : styles.input.invalidBadge.color
                                }
                                bgColor={
                                    roomNumberBadgeStatus.isValid
                                        ? styles.input.validBadge.backgroundColor
                                        : styles.input.invalidBadge.backgroundColor
                                }
                                size={styles.input.validBadge.width}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <AuthScreenBottonButton
                title={
                    IsEditMode
                        ? messages.messages.auth.set_building.next_btn_title
                        : messages.messages.auth.set_building.next_btn_title_when_change_next
                }
                onPress={() => {
                    IsEditMode
                        ? onPressNextButton()
                        : navigation.reset({
                              index: 0,
                              routes: [{ name: "home" }],
                              //routes: [{ name: "test" }],
                          });
                }}
            />
        </SafeAreaView>
    );
}
