import AppThemes from ".";
import { UseAppThemeReturnType } from "./types";
import { useColorScheme } from "react-native";


export default function useAppTheme(): UseAppThemeReturnType {
    const Theme: AppThemes = new AppThemes
    
    return useColorScheme() === "dark" ? Theme.DarkTheme : Theme.LightTheme;
}