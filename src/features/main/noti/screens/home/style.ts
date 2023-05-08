import { StyleSheet } from "react-native";
import { UseNoticeHomeScreenStylesType } from "./type";

export default function useNoticeHomeScreenStyles(): UseNoticeHomeScreenStylesType {
    return StyleSheet.create({
        contentsWrapper: {
            flex: 1,
        },
    });
}
