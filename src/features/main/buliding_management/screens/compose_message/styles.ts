import { StyleSheet } from "react-native";
import { UseNoticeRegisterScreenStylesType } from "./type";

export default function useComposeMessageScreenStyles(): UseNoticeRegisterScreenStylesType {
    return StyleSheet.create({
        contentsWrapper: {
            flex: 1,
        },
    });
}
