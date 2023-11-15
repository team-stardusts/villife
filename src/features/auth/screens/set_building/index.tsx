import { useEffect, useState } from "react";
import { SafeAreaView, View, LogBox, Alert, Text } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import AuthScreenCommonInput from "../../blocks/input";
import ScreenTitleView from "../../../common/blocks/title_view";
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
import useAuthService from "../../services/authentication";

LogBox.ignoreLogs(["Did not receive response to shouldStartLoad in time"]);

type BadgeStatus = {
    title: string;
    isValid: boolean;
};

export default function SetBuildingScreen({ navigation, route }: SetBuildingScreenProps) {
    const messages = useScreenMessage();
    const styles = useSetBuildingScreenStyles();
    const authService = useAuthService();

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

    const [isWaitingForApprove, setIsWaitingForApprove] = useState(false);

    const validateService = useValidateResidenceService();
    const validator: IStringValidator = new StringValidator();

    const onPressNextButton = async () => {
        console.log("building : ", buildingInfo, roomNumber);
        if (!buildingInfo) return Alert.alert("오류", "유효하지 않은 건물입니다."); // TO DO:: 문구 및 표시 방식 수정 필요

        if (!roomNumber) return Alert.alert("오류", "호수 정보를 입력해주세요");
        validateService
            .VerifyRoom({
                building_id: buildingInfo?.building_id,
                room_number: parseInt(roomNumber),
            })
            .then((r) => {
                validateService
                    .RequestValidationOfUserRegidence({
                        building_id: buildingInfo.building_id,
                        room_number: parseInt(roomNumber),
                    })
                    // 유저가 등록하려는 호수에 이미 유저랑 동일한 계약 정보가 등록되어 있다면, 자동 승인
                    .then((r) => {
                        if (r.request_id === 0) {
                            authService.refreshUserInfo().then((ok) => {
                                if (ok) {
                                    console.log("[SetBuildingScreen] exist contract matched with requester");
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: "home" }],
                                    });
                                    return;
                                }
                            });
                        }
                        setIsWaitingForApprove(true);
                    })
                    .catch((r) => {
                        return Alert.alert("오류", "거주 인증 실패");
                    });
            })
            .catch((r) => {
                return Alert.alert(
                    "호수 재확인 필요",
                    "조회되지 않는 호실입니다\n입력하신 호수를 다시 확인하시거나 관리자에게 문의해주세요!\n"
                );
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
        if (address === null) return;
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
        validateService
            .CheckUserIsWaitingForRegidenceApproval()
            .then((r) => {
                if (r.is_waiting) setIsWaitingForApprove(true);
            })
            .catch((r) => {
                console.error("[SetBuildingScreen]", r);
            });

        setAddress(null);
    }, []);

    if (isWaitingForApprove) {
        return (
            <SafeAreaView style={styles.main.container}>
                <ScreenTitleView
                    titles={[messages.messages.auth.set_building.title]}
                    subtitles={[messages.messages.auth.set_building.subtitle]}>
                    <Text>승인 대기중입니다.</Text>
                </ScreenTitleView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.main.container}>
            <ScreenTitleView
                titles={[messages.messages.auth.set_building.title]}
                subtitles={[messages.messages.auth.set_building.subtitle]}
                bottomButton={{
                    title: IsEditMode
                        ? messages.messages.auth.set_building.next_btn_title
                        : messages.messages.auth.set_building.next_btn_title_when_change_next,
                    onPress: () => {
                        IsEditMode
                            ? onPressNextButton()
                            : navigation.reset({
                                  index: 0,
                                  routes: [{ name: "home" }],
                              });
                    },
                }}>
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
                            keyboardType="numbers-and-punctuation"
                            value={roomNumber ? roomNumber : undefined}
                            onInputText={(text, name) => {
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
            </ScreenTitleView>
        </SafeAreaView>
    );
}
