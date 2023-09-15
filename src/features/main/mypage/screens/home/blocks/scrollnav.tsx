import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavButtonProps, ScrollNavProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";
import useUserInformation from "../../../../../common/hooks/service/user_info";

export default function ScrollNav(props: ScrollNavProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const user = useUserInformation();
    return (
        <View style={props.styles.container}>
            <ScrollView style={props.styles.wrapper}>
                <NavButton styles={props.styles} text={"테스트 스크린"} onPress={() => navigation.navigate("test")} />
                <NavButton
                    styles={props.styles}
                    text={"건물 설정하기 테스트"}
                    onPress={() => navigation.navigate("set_building", { id: "", password: "" })}
                />
                <NavButton
                    styles={props.styles}
                    text={"관리자 건물 변경"}
                    onPress={() => {
                        if (user?.adminInfomation) {
                            user?.changeAdminSelectedBuilding(user?.adminInfomation?.managedBuildings[2]);
                        }

                        console.log(user?.adminInfomation);
                    }}
                />
            </ScrollView>
        </View>
    );
}

function NavButton(props: NavButtonProps) {
    return (
        <View style={props.styles.btnCotainer}>
            <TouchableOpacity style={props.styles.btn} activeOpacity={0.3} onPress={() => props.onPress(props.text)}>
                <Text style={props.styles.btnText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}
