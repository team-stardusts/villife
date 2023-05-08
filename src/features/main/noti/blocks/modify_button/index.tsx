import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import useNotiModifyButtonStyles from "./styles";
import NotiModifyButtonProps from "./type";

export default function ModifyButton(props: NotiModifyButtonProps) {
    const styles = useNotiModifyButtonStyles();

    return (
        <View style={styles.ModifyButton}>
            <TouchableOpacity
                onPress={() => {
                    props.onSubmit();
                }}>
                {props.loading ? <ActivityIndicator size={"large"} /> : <Text style={{}}>수정하기</Text>}
            </TouchableOpacity>
        </View>
    );
}
