import { StyleSheet } from "react-native";

export type ComplaintReplyItemStylesType = ReturnType<typeof StyleSheet.create>;

export type ComplaintReplyItemProps = {
    data: {
        replyID: number;
        writterName: string;
        writtedAt: string;
        content: string;
        imageUris: Array<string>;
    };
};
