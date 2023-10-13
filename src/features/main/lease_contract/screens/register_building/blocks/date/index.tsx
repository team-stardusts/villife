import { Text, View } from "react-native";
import { MFDateSetterProps } from "./types";

export default function MFDateSetter(props: MFDateSetterProps) {
    return (
        <View style={props.styles.container}>
            <View style={props.styles.titleBox}>
                <Text style={props.styles.title}>관리비 정보 설정</Text>
            </View>
            <View style={props.styles.wrapper}>
                <View style={props.styles.row}>
                    <View style={props.styles.rowTitleWrapper}>
                        <Text style={props.styles.rowTitle}>고지일</Text>
                    </View>
                    <View></View>
                </View>
                <View style={props.styles.row}>
                    <View style={props.styles.rowTitleWrapper}>
                        <Text style={props.styles.rowTitle}>마감일</Text>
                    </View>
                    <View></View>
                </View>
            </View>
        </View>
    );
}
