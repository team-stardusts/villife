import { StyleSheet } from "react-native";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";

type OutlinedBoxProps = {
    approvalRequest: Approval;
};

export default OutlinedBoxProps;

export type ApprovalOutlinedBoxStylesType = ReturnType<typeof StyleSheet.create>;
