export type TimeSelectionModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    height: number;
};

/* export const SELECTOR_TYPE = {
    CALL: "call",
    MESSAGE: "message",
} as const;

export type SelectorType = (typeof SELECTOR_TYPE)[keyof typeof SELECTOR_TYPE]; */
