import { TouchableOpacity, View, Text } from "react-native";
import useUserInformation from "../../../../../common/hooks/service/user_info";
import { InfoBoxProps, MyPanelProps } from "../types";
import Icon from "../../../../../common/atoms/icon";

export default function MyPanel(props: MyPanelProps) {
    const user = useUserInformation();

    return (
        <View style={props.styles.container}>
            <View style={props.styles.wrapper}>
                <View style={props.styles.managementBox}>
                    <Icon
                        name="person"
                        size={props.styles.managementIcon.width}
                        color={props.styles.managementIcon.color}
                    />
                    <TouchableOpacity style={props.styles.managementBtn} activeOpacity={0.6}>
                        <Text style={props.styles.managementBtnText}>
                            {/* {user?.isAdmin ? "건물정보 관리" : "내 정보 관리"} */}
                            {"                "}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={props.styles.infoBox}>
                    <InfoBox
                        styles={props.styles}
                        name={user?.name ?? ""}
                        infos={[]} //["그린파크 501호", "테슬라 모델 X 139주 9343"]}
                    />
                </View>
            </View>
        </View>
    );
}

function InfoBox(props: InfoBoxProps) {
    return (
        <View style={props.styles.infoContainer}>
            <View style={props.styles.infoRow}>
                <Text style={props.styles.infoTitle}>{props.name}</Text>
            </View>
            {props.infos.map((info, index) => (
                <View style={props.styles.infoRow} key={index}>
                    <Text style={props.styles.info}>{info}</Text>
                </View>
            ))}
        </View>
    );
}
