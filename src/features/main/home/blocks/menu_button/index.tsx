import { TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Icon from "../../../../common/atoms/icon";
import useMenuButtonStyles from "./style";
import MenuButtonProps from "./type";
import HomeSideModal from "../soide_modal";

export default function MenuButton(props: MenuButtonProps) {
    const styles = useMenuButtonStyles().main;
    const [visible, setVisible] = useState<boolean>(false);
    //const iconName = props.selectorType === "call" ? "phone" : "letter";

    return (
        <View style={styles.container}>
            <HomeSideModal visible={visible} setVisible={setVisible} />
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    setVisible(true);
                }}
                style={styles.iconBox}>
                <Icon name="menu" size={styles.icon.width} color={styles.icon.color} />
            </TouchableOpacity>
        </View>
    );
}
