import { useEffect, useRef } from "react";
import { VehicleModifyType } from "../../../../blocks/modal/modify/types";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { Animated, Text, TouchableOpacity } from "react-native";
import { ANIMATION_DURATION_FAST_LV2 } from "../../../../../../common/constants";
import { EditBtnComboProps } from "../types";

export default function EditBtnCombo(props: EditBtnComboProps) {
    const messages = useScreenMessage().messages.main.parking.home;
    const opacityValue = useRef(new Animated.Value(0)).current;
    const btnTypes: VehicleModifyType[] = ["etda", "info"];

    useEffect(() => {
        const handler = Animated.timing(opacityValue, {
            toValue: 1,
            duration: ANIMATION_DURATION_FAST_LV2,
            useNativeDriver: true,
        });

        handler.start();

        return () => handler.reset();
    }, [opacityValue]);

    return (
        <Animated.View
            style={[
                props.styles.container,
                {
                    opacity: opacityValue,
                },
            ]}>
            {btnTypes.map((value, index) => (
                <TouchableOpacity
                    key={index}
                    style={props.styles.editBtn}
                    activeOpacity={0.5}
                    onPress={() => props.onPressEditBtn(value)}>
                    <Text style={props.styles.editBtnTitle}>
                        {value === "etda" ? messages.edit_etda : messages.edit_info}
                    </Text>
                </TouchableOpacity>
            ))}
        </Animated.View>
    );
}
