import { Text, TouchableOpacity, View } from "react-native";
import useBuildingTenantFilterStyles from "../styles";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";

export default function Menu(props: MenuProps) {
    const messages = useScreenMessage().messages.words;

    return (
        <View style={[props.styles.menuWrapper, {}]}>
            <TouchableOpacity
                style={[
                    props.styles.menu,
                    {
                        borderBottomColor: props.isSelected ? props.styles.menuSelected.borderBottomColor : "",
                        borderBottomWidth: props.isSelected ? props.styles.menuSelected.borderBottomWidth : 0,
                    },
                ]}
                activeOpacity={0.6}
                onPress={() => props.onMenuPress(props.type)}>
                <Text
                    style={[
                        props.styles.menuName,
                        {
                            color: props.isSelected ? props.styles.menuSelected.color : props.styles.menuName.color,
                        },
                    ]}>
                    {messages[props.type]}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

type MenuProps = {
    styles: ReturnType<typeof useBuildingTenantFilterStyles>["main"];
    type: MenuType;
    isSelected: boolean;
    onMenuPress(type: MenuType): void;
};

export type MenuType = "floor" | "contract" | "status" | "expiration";
