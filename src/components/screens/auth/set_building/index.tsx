import { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import AuthScreenCommonInput from "../../../blocks/auth_screens/input";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import useSetBuildingScreenStyles from "./styles";
import SetBuildingScreenProps from "./types";

type UserDataType = {
    address: null | string;
    room_number: null | string;
    car_number: null | string;
    nickname: null | string;
}


export default function SetBuildingScreen({navigation, route}: SetBuildingScreenProps) {
    const Messages = useScreenMessage();
    const styles = useSetBuildingScreenStyles();
    const [userData, setUserData] = useState<UserDataType>({
        address: null,
        room_number: null,
        car_number: null,
        nickname: null,
    });
    const [isDone, setIsDone] = useState<boolean>(false)

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

    useEffect(() => {
        validateUserData();
    }, [userData]);

    useEffect(() => {
        console.log(isDone)
    }, [isDone])

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