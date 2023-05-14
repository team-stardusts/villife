import { Text, View } from "react-native";
import { ComplaintStatusLableProps } from "./types";
import useComplaintStatusLableStyle from "./styles";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

function ComplaintStatusLable(props: ComplaintStatusLableProps) {
    const styles = useComplaintStatusLableStyle();
    const messages = useScreenMessage();
    switch (props.status) {
        case "received":
            return (
                <View style={[styles.container, { backgroundColor: "#ACEC22" }]}>
                    <Text style={styles.text}>{messages.messages.main.complaint.received}</Text>
                </View>
            );
        case "in_progress":
            return (
                <View style={[styles.container, { backgroundColor: "#ACEC22" }]}>
                    <Text style={styles.text}>{messages.messages.main.complaint.inprogress}</Text>
                </View>
            );
        case "completed":
            return (
                <View style={[styles.container, { backgroundColor: "#79797C" }]}>
                    <Text style={styles.text}>{messages.messages.main.complaint.done}</Text>
                </View>
            );
    }
}

export default ComplaintStatusLable;
