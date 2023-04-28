import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, LogBox, Alert } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import AuthScreenCommonInput from "../../../blocks/auth_screens/input";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import useSetBuildingScreenStyles from "./styles";
import SetBuildingScreenProps from "./types";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
import SelectedAddressStateType from "../../../../hooks/states/atoms/address/selected_address/types";
import { useRecoilState } from "recoil";
import selectedAddressState from "../../../../hooks/states/atoms/address/selected_address";
import VillifeServer from "../../../../libs/rest_apis/villife";
import { VerifyBuildingAddressResult } from "../../../../libs/rest_apis/villife/types";

LogBox.ignoreLogs(["Did not receive response to shouldStartLoad in time"]);

export default function SetBuildingScreen({ navigation, route }: SetBuildingScreenProps) {
    const Messages = useScreenMessage();
    const styles = useSetBuildingScreenStyles();
    const [roomNumber, setRoomNumber] = useState<number | null>(null);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [address, setAddress] = useRecoilState<SelectedAddressStateType>(selectedAddressState);
    const [buildingInfo, setBuildingInfo] = useState<VerifyBuildingAddressResult>();

    const validateUserData = () => {
        if (!(address && roomNumber && buildingInfo)) {
            setIsDone(false);
            return;
        } else {
            setIsDone(true);
        }
    };

    const onPressNextButton = async () => {
        if (!buildingInfo) return Alert.alert("오류", "유효하지 않은 건물입니다."); // TO DO:: 문구 및 표시 방식 수정 필요
        const api = new VillifeServer();

        const result = await api.ValidateUserResidenceForTest({
            building_id: buildingInfo.building_id,
            room_number: roomNumber!!,
        });
        console.log(result.data?.data);

        if (result.data?.status == 200) {
            navigation.reset({
                index: 0,
                routes: [{ name: "home", params: {} }],
            });
        } else {
            Alert.alert("디버그용 에러", `에러 발생 : ${result.data?.data}`);
        }
    };

    useEffect(() => {
        validateUserData();
    }, [address, roomNumber]);

    // Selected address 초기화
    useEffect(() => {
        setAddress(null);
    }, []);
    // 주소 확인 작업
    useEffect(() => {
        if (address == null) return;
        new VillifeServer().verifyBuildingAddress({ address: address.roadAddress }).then((r) => {
            if (r.data?.status == 400) {
                return;
            }
            if (r.data?.status == 200) {
                console.log(r.data.data);
                setBuildingInfo(r.data.data);
            }
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
                    isDone
                        ? Messages.messages.auth.set_building.next_btn_title
                        : Messages.messages.auth.set_building.next_btn_title_when_change_next
                }
                onPress={() => {
                    onPressNextButton();
                }}
            />
        </SafeAreaView>
    );
}
