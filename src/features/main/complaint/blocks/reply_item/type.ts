import { StyleSheet } from "react-native";
import { GetOneReplyResult, GetRepliesResult } from "../../../../../libs/rest_apis/villife/complaint/types";

export type ComplaintReplyItemStylesType = ReturnType<typeof StyleSheet.create>;

export type ComplaintReplyItemProps = {
    data: GetOneReplyResult;
};
