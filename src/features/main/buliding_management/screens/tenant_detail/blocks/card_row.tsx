import { View, Text } from "react-native";
import type useTenantDetailScreenStyles from "../styles";

export default function CardRow(props: CardRowProps) {
    return (
        <View style={props.styles.cardRow}>
            <Text style={props.styles.cardRowKey}>{props.rowKey}</Text>
            <Text style={props.styles.cardRowValue}>{props.rowValue ?? ""}</Text>
        </View>
    );
}

type CardRowProps = {
    styles: ReturnType<typeof useTenantDetailScreenStyles>;
    rowKey: string;
    rowValue: string | undefined;
};
