import { Text, View } from "react-native";
import { MFDaySetterProps } from "./types";

export default function MFDateSetter(props: MFDaySetterProps) {
    return (
        <View style={props.styles.container}>
            <View style={props.styles.titleBox}>
                <Text style={props.styles.title}>관리비 정보 설정</Text>
            </View>
            <View style={props.styles.wrapper}>
                {["고지일", "마감일"].map((dayName, i) => (
                    <MFDaySetter key={i} dayName={dayName} styles={props.styles} />
                ))}
            </View>
        </View>
    );
}

function MFDaySetter(props: MFDaySetterProps) {
    return (
        <View style={props.styles.row}>
            <View style={props.styles.rowTitleWrapper}>
                <Text style={props.styles.rowTitle}>{props.dayName}</Text>
            </View>
            <View></View>
        </View>
    );
}
