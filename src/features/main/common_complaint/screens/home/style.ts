import { StyleSheet } from "react-native";
import { UseCommonComplaintHomeScreenStylesType } from "./type";

export default function useCommonComplaintHomeScreenStyles(): UseCommonComplaintHomeScreenStylesType {
    return StyleSheet.create({
        contentsWrapper: {
            flex: 1,
        },
    });
}
