import { StyleSheet } from "react-native";
import { UseNoticeModifyScreenStylesType } from "./type";

export default function useNoticeModifyScreenStyles(): UseNoticeModifyScreenStylesType {
    return StyleSheet.create({
        contentsWrapper: {
            flex: 1,
        },
    });
}
