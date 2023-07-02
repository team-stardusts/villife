import { useEffect, useState } from "react";
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

LogBox.ignoreLogs(["Did not receive response to shouldStartLoad in time"]);

export default function SetBuildingScreen({ navigation, route }: SetBuildingScreenProps) {
    const Messages = useScreenMessage();
    const styles = useSetBuildingScreenStyles();
    const [roomNumber, setRoomNumber] = useState<number | null>(null);
    const [IsEditMode, setIsEditMode] = useState<boolean>(false);
    const [address, setAddress] = useRecoilState<SelectedAddressStateType>(selectedAddressState);
    const [buildingInfo, setBuildingInfo] = useState<BuildingInfo>();
    const validateService = useValidateResidenceService();

    const onPressNextButton = async () => {
        console.log("building : ", buildingInfo, roomNumber);
        if (!buildingInfo) return Alert.alert("오류", "유효하지 않은 건물입니다."); // TO DO:: 문구 및 표시 방식 수정 필요

        if (!roomNumber) return Alert.alert("오류", "호수 정보를 입력해주세요");
        validateService
            .RequestValidationOfUserRegidence({
                building_id: buildingInfo.building_id,
                room_number: roomNumber,
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
        if (address) setIsEditMode(true);
    }, [address, roomNumber]);

    // Selected address 초기화
    useEffect(() => {
        setAddress(null);
    }, []);
    // 주소 확인 작업
    useEffect(() => {
        if (address == null) return;
        validateService
            .VerifyBuildingAddress({ address: address.roadAddress })
            .then((r) => {
                setBuildingInfo(r);
            })
            .catch((r) => {
                console.log(r);
            });
    }, [address]);

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            <View style={styles.Screen.screenWrapper}>
                <AuthScreenTitleView
                    title={Messages.messages.auth.set_building.title}
                    subtitles={[Messages.messages.auth.set_building.subtitle]}
                />
                <View style={styles.Screen.contentsWrapper}>
                    <View style={styles.InputsSection.topLevelBox}>
                        <View style={styles.InputsSection.attrWrapper}>
                            <AuthScreenCommonInput
                                title={Messages.messages.auth.set_building.adress_input_title}
                                placeholder={Messages.messages.auth.set_building.adress_input_placeholder}
                                name="address"
                                onPressIn={() => navigation.navigate("search_address", {})}
                                value={address?.roadAddress ?? ""}
                            />
                            {/** 여기를 예쁘게 수정해주세요 태성님 */}
                            {address?.roadAddress != undefined && buildingInfo == undefined ? (
                                <View>
                                    <Text>유효하지 않은 주소입니다</Text>
                                </View>
                            ) : (
                                <></>
                            )}
                            {address?.roadAddress != "" && buildingInfo != undefined && (
                                <View>
                                    <Text>{`유효한 주소입니다. 건물 이름 : ${buildingInfo.building_name}`}</Text>
                                </View>
                            )}

                            <AuthScreenCommonInput
                                title={Messages.messages.auth.set_building.room_number_input_title}
                                placeholder={Messages.messages.auth.set_building.room_number_input_placeholder}
                                name="room_number"
                                onChangeText={(text, name) => {
                                    setRoomNumber(parseInt(text));
                                    console.log(roomNumber);
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.BlankSection.topLevelBox}></View>
                </View>
            </View>
            <AuthScreenBottonButton
                title={
                    IsEditMode
                        ? Messages.messages.auth.set_building.next_btn_title
                        : Messages.messages.auth.set_building.next_btn_title_when_change_next
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
