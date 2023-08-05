import { AlertOptions } from "react-native";

export type StardustAlertProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    type?: AlertType;
    message?: string;
    buttons?: AlertButton[];
};

export type AlertType = "info" | "success" | "warning" | "error";

export type AlertButton = {
    text: string | undefined;
    onPress?: ((value?: AlertButton["text"]) => void) | undefined;
};
