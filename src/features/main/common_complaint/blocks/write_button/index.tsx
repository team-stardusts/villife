import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import { VillifeNavigation } from "../../../../common/router/types";
import useNotiWriteButtonStyles from "./styles";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NotiWriteButtonProps from "./type";

export default function WriteButton(props: NotiWriteButtonProps): JSX.Element {
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useNotiWriteButtonStyles();
    const message = useScreenMessage();

    return (
        <View style={styles.writeButton}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("noti_register", {});
                }}>
                <Text style={styles.writeText}>{message.messages.words.register}</Text>
            </TouchableOpacity>
        </View>
    );
}
