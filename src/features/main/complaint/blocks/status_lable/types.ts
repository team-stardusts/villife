import { StyleSheet } from "react-native";
import { ComplaintStatus } from "../../../../../libs/rest_apis/villife/complaint/types";

export type ComplaintStatusLableStylesType = ReturnType<typeof StyleSheet.create>;

export type ComplaintStatusLableProps = {
    status: ComplaintStatus;
};
