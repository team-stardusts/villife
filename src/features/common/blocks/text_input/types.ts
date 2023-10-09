export type InputProps = {
    focus?: boolean;
    onInputInvalidValue?(): void;
    onInputValidValue(value: string): void;
};

export type ReusableTextInputProps = InputProps & {
    type: ReusableTextInputType;
};

export type ReusableTextInputType = "phone-number" | "plate-number";
