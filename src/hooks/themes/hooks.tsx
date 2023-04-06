import AppThemes from ".";
import { useColorScheme } from "react-native";
import { UseAppThemeReturnType } from "./types";

export default function useAppTheme(): UseAppThemeReturnType {
    const Theme: AppThemes = new AppThemes()

    return useColorScheme() === "dark" ? Theme.DarkTheme : Theme.LightTheme;
}