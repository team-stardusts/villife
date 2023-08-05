import { ColorValue, Text, View } from "react-native";
import useStardustAlertStyles from "../styles";
import { AlertType } from "../types";
import useStyler from "../../../../hooks/styler/hooks";
import useScreenMessage from "../../../../hooks/multilingual/hooks";

type StardustAlertHeaderProps = {
    type?: AlertType;
    title: string;
    enterMessage: boolean;
    styles: ReturnType<typeof useStardustAlertStyles>["header"];
};

export default function StardustAlertHeader(props: StardustAlertHeaderProps) {
    const { theme } = useStyler();
    const messages = useScreenMessage().messages.status;

    const selectTitle = (): string => {
        if (props.enterMessage) {
            return props.title;
        }

        switch (props.type) {
            case "warning":
                return messages.warning;
            case "error":
                return messages.error;
            case "success":
                return messages.success;
            default:
                return messages.info;
        }
    };

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
            <Text style={props.styles.title}>{selectTitle()}</Text>
        </View>
    );
}
