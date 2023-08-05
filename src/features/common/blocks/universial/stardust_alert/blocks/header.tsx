import { ColorValue, Text, View } from "react-native";
import useStardustAlertStyles from "../styles";
import { AlertType } from "../types";
import useStyler from "../../../../hooks/styler/hooks";

type StardustAlertHeaderProps = {
    type?: AlertType;
    title: string;
    styles: ReturnType<typeof useStardustAlertStyles>["header"];
};

export default function StardustAlertHeader(props: StardustAlertHeaderProps) {
    const { theme } = useStyler();

    const selectBgColor = (): ColorValue => {
        switch (props.type) {
            case "warning":
                return theme.color.status.warning;
            case "error":
                return theme.color.status.danger;
            case "success":
                return theme.color.status.success;
            default:
                return theme.color.status.info;
        }
    };

    return (
        <View style={[props.styles.container, { backgroundColor: selectBgColor() }]}>
            <Text style={props.styles.title}>{props.title}</Text>
        </View>
    );
}
