import { StyleSheet } from "react-native";
import { useBottomEditModalStylesType } from "./type";

export default function useBottomEditModalStyles(): useBottomEditModalStylesType {
    return StyleSheet.create({
        editButtonContainer: {
            position: "absolute",
            zIndex: 10,
            right: "5%",
        },
        editButton: {
            backgroundColor: "#DAEAFD",
            flexDirection: "row",
            alignItems: "center",
            padding: 3,
            borderRadius: 10,
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
}
