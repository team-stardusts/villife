import { StyleSheet } from "react-native";
import { Reply } from "../../services/type";

export default interface ReplyEditModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    replyInfo: Reply;
}
