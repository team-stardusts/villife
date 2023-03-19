import Postcode from "@actbase/react-daum-postcode";
import { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import AuthScreenCommonInput from "../../../blocks/auth_screens/input";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import useSetBuildingScreenStyles from "./styles";
import SetBuildingScreenProps, { SelectedAddress } from "./types";
import { LogBox } from 'react-native';
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";


// navigation params에 callback 함수를 삽입하면 발생하는 error로 
// 이 screen에서 발생하는 error는 ignore해도 됨.

type UserDataType = {
    address: null | string;
    room_number: null | string;
    car_number: null | string;
    nickname: null | string;
}


export default function SetBuildingScreen({navigation, route}: SetBuildingScreenProps) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
        'Did not receive response to shouldStartLoad in time, defaulting to YES'
      ]);
      
    const Messages = useScreenMessage();
    const styles = useSetBuildingScreenStyles();
    const [userData, setUserData] = useState<UserDataType>({
        address: null,
        room_number: null,
        car_number: null,
        nickname: null,
    });
    const [isDone, setIsDone] = useState<boolean>(false);
    const [address, setAddress] = useState<SelectedAddress | null>(null);

    const validateUserData = () => {
        const {
            address,
            room_number,
            car_number,
            nickname,
        } = userData;

        if (!(address && room_number && car_number && nickname)) {
            setIsDone(false);
            return;
        }
        else {
            setIsDone(true);
        }
    }

    const handleOnSelected = (searched: OnCompleteParams) => {
        const {
            roadAddress,
            jibunAddress,
            buildingCode,
            buildingName,
            zonecode,
        } = searched;

        setAddress({
            roadAddress,
            jibunAddress,
            buildingCode,
            buildingName,
            zonecode,
        })
    }

    useEffect(() => {
        validateUserData();
    }, [userData]);

    useEffect(() => {
        console.log(address?.roadAddress);
        console.log(address?.jibunAddress);
        console.log(address?.buildingCode);
        console.log(address?.buildingName);
        console.log(address?.zonecode);
    }, [address])

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
                                onPressIn={() => navigation.navigate("search_address", {onGoBack: handleOnSelected})}
                                onChangeText={(text, name) =>{
                                    if (name === "address")
                                    setUserData({...userData, [name]: text})
                                }}
                                />
                            <AuthScreenCommonInput 
                                title={Messages.messages.auth.set_building.room_number_input_title}
                                placeholder={Messages.messages.auth.set_building.room_number_input_placeholder}
                                name="room_number"
                                onChangeText={(text, name) =>{
                                    if (name === "room_number")
                                    setUserData({...userData, [name]: text})
                                }}
                                />
                            <AuthScreenCommonInput 
                                title={Messages.messages.auth.set_building.car_number_input_title}
                                placeholder={Messages.messages.auth.set_building.car_number_input_placeholder}
                                name="car_number"
                                onChangeText={(text, name) =>{
                                    if (name === "car_number")
                                    setUserData({...userData, [name]: text})
                                }}
                                />
                            <AuthScreenCommonInput 
                                title={Messages.messages.auth.set_building.nickname_input_title}
                                placeholder={Messages.messages.auth.set_building.nickname_input_placeholder}
                                name="nickname"
                                onChangeText={(text, name) =>{
                                    if (name === "nickname")
                                    setUserData({...userData, [name]: text})
                                }}
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