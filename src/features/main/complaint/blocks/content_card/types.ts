import { ComplaintInfo } from "../../services/type";
import { StyleSheet } from "react-native";

export type ComplaintContentCardStylesType = ReturnType<typeof StyleSheet.create>;

export type ComplaintContentCardProps = {
    info: ComplaintInfo;
};
