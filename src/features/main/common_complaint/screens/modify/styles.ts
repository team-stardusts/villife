import { StyleSheet } from "react-native";
import { UseCommonComplaintModifyScreenStylesType } from "./type";

export default function useCommonComplaintModifyScreenStyles(): UseCommonComplaintModifyScreenStylesType {
    return StyleSheet.create({
        contentsWrapper: {
            flex: 1,
        },
    });
}
