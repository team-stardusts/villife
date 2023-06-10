import { ComplaintStatus } from "../../../../../libs/rest_apis/villife/complaint/types";
import { ComplaintInfo } from "../../services/type";
import { StyleSheet } from "react-native";

export type ComplaintContentCardStylesType = ReturnType<typeof StyleSheet.create>;

export type ComplaintContentCardProps = {
    info: ComplaintInfo;
    editMode?: boolean;
    updatedStatus?: React.MutableRefObject<ComplaintStatus | undefined>;
};
