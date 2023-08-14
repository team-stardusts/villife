import { ColorValue, StyleSheet, Text, View } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { Building } from "../../../../../../libs/rest_apis/villife/building/types";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { useEffect, useState } from "react";

export default function TenantRoomStateLabel(props: TenantRoomStateLabelProps) {
    const styles = useTenantRoomStateLabelStyles();
    const messages = useScreenMessage().messages;
    const [label, setLabel] = useState<LabelType>({
        status: messages.words.empty_room,
        style: styles.empty,
    });

    useEffect(() => {
        setLabelStatus();
    }, [props.roomState]);

    const setLabelStatus = () => {
        switch (props.roomState) {
            case "empty":
                setLabel({
                    ...label,
                    status: messages.words.empty_room,
                    style: styles.empty,
                });
                break;
            case "signed":
                setLabel({
                    ...label,
                    status: messages.words.app_signed_state,
                    style: styles.signed,
                });
                break;
            case "unsigned":
                setLabel({
                    ...label,
                    status: messages.words.app_unsigned_state,
                    style: styles.unsigned,
                });
                break;
        }
    };

    return (
        <View style={[styles.label, { backgroundColor: label.style.backgroundColor }]}>
            <Text style={{ ...label.style }}>{label.status}</Text>
        </View>
    );
}

function useTenantRoomStateLabelStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        label: {
            width: deviceUI.moderateScale(55),
            height: deviceUI.moderateScale(25),
            borderRadius: deviceUI.moderateScale(20),
            justifyContent: "center",
            alignItems: "center",
        },
        empty: {
            backgroundColor: theme.color.status.secondary,
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
        },
        signed: {
            backgroundColor: theme.color.status.primary,
            color: theme.color.specified.white,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
        },
        unsigned: {
            backgroundColor: theme.color.status.danger,
            color: theme.color.specified.white,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
        },
    });
}

type TenantRoomStateLabelProps = {
    roomState: Building.RoomState;
};

type LabelType = {
    status: string;
    style: {
        backgroundColor: ColorValue;
        color: ColorValue;
    };
};
