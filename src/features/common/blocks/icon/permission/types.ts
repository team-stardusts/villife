import { GestureResponderEvent } from "react-native/types";

export interface PressableIconProps {
    diameter: number;
    children: React.ReactNode;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export interface PermissionIconProps {
    diameter: number;
}
export interface PressablePermissionIconProps extends PermissionIconProps {
    providerName: string;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export type PermissionIconReturnType = JSX.Element;
