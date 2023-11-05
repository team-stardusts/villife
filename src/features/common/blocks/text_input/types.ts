import { ColorValue } from "react-native";

export type InputProps = {
    focus?: boolean;
    highlightColor?: ColorValue;
    initialData?: string[];
    lowlightColor?: ColorValue;
    onInputInvalidValue?(): void;
    onInputValidValue(value: string): void;
};

export type ReusableTextInputProps = InputProps & {
    type: ReusableTextInputType;
};

export type ReusableTextInputType = "6digit-authcode" | "phone-number" | "plate-number" | "identity-number";
