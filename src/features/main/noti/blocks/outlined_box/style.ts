import { StyleSheet } from "react-native";

const OutlinedBoxStyle = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: "#0B75F2",
        marginVertical: "1.5%",
        borderRadius: 15,
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
    editButtonContainer: {
        position: "absolute",
        zIndex: 10,
        right: "5%",
    },
    editButton: {
        marginRight: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    editModalContentContainer: {
        marginTop: "5%",
        width: "100%",
    },
    editModalMenu: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "10%",
        paddingBottom: "5%",
    },
    editModalMenuText: {
        marginLeft: 15,
        color: "black",
    },
});

export default OutlinedBoxStyle;
