import { AlertOptions } from "react-native";

export type StardustAlertContent = {
    visible: boolean;
    title: string;
    type?: AlertType;
    message?: string;
    buttons?: AlertButton[];
};

export type StardustAlertProps = StardustAlertContent & {
    setAlert: React.Dispatch<React.SetStateAction<StardustAlertContent>>;
};

export type AlertType = "info" | "success" | "warning" | "error" | "primary";

export type AlertButton = {
    text: string | undefined;
    onPress?: ((value?: AlertButton["text"]) => void) | undefined;
};
