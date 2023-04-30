import { StyleSheet } from "react-native";
import useSystemInfo from "../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../hooks/themes_legacy/hooks";
//import { SearchAddressScreenStylesType } from "./types";

export default function useSearchAddressScreenStyles() {
    //}: SearchAddressScreenStylesType {
    const Theme = useAppThemeLegacy();
    const SystemInfo = useSystemInfo();

    const Screen = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: Theme.colors.colorFamily.white,
        },
    });

    const TitleSection = StyleSheet.create({
        topLevelBox: {
            flex: 0.7,
        },
        textWrapper: {
            flex: 1,
            paddingTop: SystemInfo.window.width * 0.05,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            color: Theme.colors.colorFamily.blue,
            fontSize: SystemInfo.window.width * 0.05,
            fontWeight: "bold",
        },
    });

    const InputsSection = StyleSheet.create({
        topLevelBox: {
            flex: 0.7,
        },
        inputWrapper: {
            flex: 1,
            paddingHorizontal: SystemInfo.window.width * 0.04,
            justifyContent: "center",
            borderBottomWidth: 2,
            borderStyle: "solid",
            borderColor: Theme.colors.colorFamily.grey,
        },
        input: {
            color: Theme.colors.colorFamily.black,
            fontSize: SystemInfo.window.width * 0.037,
        },
    });

    const AddressListSection = StyleSheet.create({
        topLevelBox: {
            flex: 8.6,
        },
        listWrapper: {
            backgroundColor: Theme.colors.colorFamily.lightgrey,
            paddingHorizontal: SystemInfo.window.width * 0.03,
            paddingVertical: SystemInfo.window.height * 0.01,
        },
        contentsWrapper: {
            height: SystemInfo.window.height * 0.15,
            marginTop: SystemInfo.window.height * 0.005,
            padding: SystemInfo.window.height * 0.015,
            borderRadius: SystemInfo.window.width * 0.01,
            backgroundColor: Theme.colors.colorFamily.white,
        },
        zoneNumberBox: {
            flex: 4,
            justifyContent: "center",
        },
        zoneNumber: {
            fontSize: SystemInfo.window.width * 0.035,
            color: Theme.colors.colorFamily.red,
        },
        addressBox: {
            flex: 6,
            justifyContent: "space-around",
            paddingVertical: SystemInfo.window.height * 0.007,
        },
        addressWrapper: {
            flexDirection: "row",
        },
        addressTypeBadge: {
            borderWidth: 0.3,
            width: SystemInfo.window.width * 0.1,
            borderColor: Theme.colors.colorFamily.darkgrey,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SystemInfo.window.width * 0.02,
        },
        addressType: {
            fontSize: SystemInfo.window.width * 0.03,
            color: Theme.colors.colorFamily.blue,
        },
    });

    return {
        Screen,
        TitleSection,
        InputsSection,
        AddressListSection,
    };
}
