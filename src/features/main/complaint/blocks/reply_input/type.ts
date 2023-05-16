import { StyleSheet } from "react-native";

export type RelplyInputStylesType = ReturnType<typeof StyleSheet.create>;

export type RelpyInputProps = {
    complaintID: number;
    whenModify?: {
        replyID: number;
        content: string;
        imageUris: Array<string>;
    };
};
