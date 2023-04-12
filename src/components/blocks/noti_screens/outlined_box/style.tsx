import { StyleSheet } from "react-native";

const OutlinedBoxStyle = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: "#0B75F2",
        marginVertical: "1.5%",
        borderRadius: 15,
        overflow: "hidden",
    },
    innerBox: {
        alignItems: "center",
        overflow: "visible",
    },
    innerTitleSection: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
    },
    titleTextBox: {
        marginLeft: "5%",
    },
    absoluteWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
});

export default OutlinedBoxStyle;
