import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, LogBox } from "react-native";
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


LogBox.ignoreLogs([
    'Did not receive response to shouldStartLoad in time'
  ]);


export default function SetBuildingScreen({navigation, route}: SetBuildingScreenProps) {      
    const Messages = useScreenMessage();
    const styles = useSetBuildingScreenStyles();
    const [roomNumber, setRoomNumber] = useState<string|null>(null);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [address, setAddress] = useRecoilState<SelectedAddressStateType>(selectedAddressState);

    const validateUserData = () => {
        if (!(address && roomNumber)) {
            setIsDone(false);
            return;
        }
        else {
            setIsDone(true);
        }
    }

    useEffect(() => {
        validateUserData();
    }, [address, roomNumber]);

    // Selected address 초기화
    useEffect(() => {
        setAddress(null);
    }, [])

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
                            <AuthScreenCommonInput 
                                title={Messages.messages.auth.set_building.room_number_input_title}
                                placeholder={Messages.messages.auth.set_building.room_number_input_placeholder}
                                name="room_number"
                                onChangeText={(text, name) => setRoomNumber(text)}
                                />
                        </View>
                    </View>
                    <View style={styles.BlankSection.topLevelBox}>
                    </View>
                </View>
            </View>
            <AuthScreenBottonButton 
                    title={
                        isDone
                        ? Messages.messages.auth.set_building.next_btn_title
                        : Messages.messages.auth.set_building.next_btn_title_when_change_next
                    }
                    />
        </SafeAreaView>
    )
}