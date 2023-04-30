import { useState } from "react";
import { Pressable, View } from "react-native";
import { Svg, Path } from "react-native-svg";
import { PressableIconProps, PressableVectorIconProps, VectorIconProps, VectorIconReturnType } from "./types";

function RightVectorIcon(props: VectorIconProps): VectorIconReturnType {
    const { diameter } = props;

    return (
        <Svg width={diameter} height={diameter} viewBox="0 0 24 24" fill="none">
            <Path
                d="M9 18L15 12L9 6"
                stroke="#191F26"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}

function LeftVectorIcon(props: VectorIconProps): VectorIconReturnType {
    const { diameter } = props;

    return (
        <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} fill="none">
            <Path
                d="M15 18L9 12L15 6"
                stroke="#191F26"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}

function UpVectorIcon(props: VectorIconProps): VectorIconReturnType {
    const { diameter } = props;

    return (
        <Svg width={diameter} height={diameter} viewBox={`0 0 24 24`} fill="none">
            <Path
                d="M18 15L12 9L6 15"
                stroke="#191F26"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}

function DownVectorIcon(props: VectorIconProps): VectorIconReturnType {
    const { diameter } = props;

    return (
        <Svg width={diameter} height={diameter} viewBox={`0 0 24 24`} fill="none">
            <Path
                d="M6 9L12 15L18 9"
                stroke="#191F26"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}

function PlusVectorIcon(props: VectorIconProps): VectorIconReturnType {
    const { diameter } = props;

    return (
        <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} fill="none">
            <Path d="M12 5V19" stroke="#191F26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M5 12H19" stroke="#191F26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

function PressableIcon(props: PressableIconProps): JSX.Element {
    const { diameter } = props;
    const radius = diameter / 2;
    const pressedOpacity: number = 0.2;
    const unpressedOpacity: number = 0;
    const [opacity, setOpacity] = useState(unpressedOpacity);

    return (
        <Pressable
            onPress={props.onPress}
            onPressIn={() => (props.onPress ? setOpacity(pressedOpacity) : undefined)}
            onPressOut={() => (props.onPress ? setOpacity(unpressedOpacity) : undefined)}>
            {props.children}
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: diameter,
                    height: diameter,
                    backgroundColor: "grey",
                    borderRadius: radius,
                    opacity: opacity,
                    zIndex: 1,
                }}
            />
        </Pressable>
    );
}

export default function PressableVectorIcon(props: PressableVectorIconProps): VectorIconReturnType {
    const { providerName, diameter } = props;

    switch (providerName) {
        case "right":
            return (
                <PressableIcon diameter={diameter} onPress={props.onPress}>
                    <RightVectorIcon diameter={diameter} />
                </PressableIcon>
            );
        case "left":
            return (
                <PressableIcon diameter={diameter} onPress={props.onPress}>
                    <LeftVectorIcon diameter={diameter} />
                </PressableIcon>
            );
        case "up":
            return (
                <PressableIcon diameter={diameter} onPress={props.onPress}>
                    <UpVectorIcon diameter={diameter} />
                </PressableIcon>
            );
        case "down":
            return (
                <PressableIcon diameter={diameter} onPress={props.onPress}>
                    <DownVectorIcon diameter={diameter} />
                </PressableIcon>
            );
        default:
            return (
                <PressableIcon diameter={diameter} onPress={props.onPress}>
                    <PlusVectorIcon diameter={diameter} />
                </PressableIcon>
            );
    }
}
