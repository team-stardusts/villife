import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import { VillifeNavigation } from "../../../../common/router/types";
import useNotiWriteButtonStyles from "./styles";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NotiWriteButtonProps from "./type";

export default function WriteButton(props: NotiWriteButtonProps): JSX.Element {
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useNotiWriteButtonStyles();
    const Message = useScreenMessage();

    return (
        <View style={styles.WriteButton}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("noti_register", {});
                }}>
                <Text>{Message.messages.words.register}</Text>
            </TouchableOpacity>
        </View>
    );
}
