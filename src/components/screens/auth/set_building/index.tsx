import { SafeAreaView, View, Text } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import AuthScreenBottonButton from "../../../blocks/auth_screens/bottom_button";
import AuthScreenCommonInput from "../../../blocks/auth_screens/input";
import AuthScreenTitleView from "../../../blocks/auth_screens/title_view";
import useSetBuildingScreenStyles from "./styles";
import SetBuildingScreenProps from "./types";

export default function SetBuildingScreen({navigation, route}: SetBuildingScreenProps) {
    const Messages = useScreenMessage();
    const Styles = useSetBuildingScreenStyles();

    return (
        <SafeAreaView style={Styles.Screen.topLevelBox}>
            <View style={Styles.Screen.screenWrapper}>
                <AuthScreenTitleView
                    title={Messages.messages.auth.set_building.title}
                    subtitles={[Messages.messages.auth.set_building.subtitle]}
                    />
                <View style={Styles.Screen.contentsWrapper}>
                    <View style={Styles.InputsSection.topLevelBox}>
                        <View style={Styles.InputsSection.attrWrapper}>
                            <AuthScreenCommonInput 
                                title={Messages.messages.auth.set_building.adress_input_title}
                                placeholder={Messages.messages.auth.set_building.adress_input_placeholder}
                                />
                            <AuthScreenCommonInput 
                                title={Messages.messages.auth.set_building.room_number_input_title}
                                placeholder={Messages.messages.auth.set_building.room_number_input_placeholder}
                                />
                            <AuthScreenCommonInput 
                                title={Messages.messages.auth.set_building.car_number_input_title}
                                placeholder={Messages.messages.auth.set_building.car_number_input_placeholder}
                                />
                            <AuthScreenCommonInput 
                                title={Messages.messages.auth.set_building.nickname_input_title}
                                placeholder={Messages.messages.auth.set_building.nickname_input_placeholder}
                                />
                        </View>
                    </View>
                    <View style={Styles.BlankSection.topLevelBox}>
                    </View>
                </View>
            </View>
            <AuthScreenBottonButton 
                    title={Messages.messages.auth.set_building.next_btn_title}
                    />
        </SafeAreaView>
    )
}