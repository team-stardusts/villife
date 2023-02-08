import AppThemes from ".";
import { UseAppThemeReturnType } from "./types";
import { useColorScheme } from "react-native/types";


export default function useAppTheme(): UseAppThemeReturnType {
    const Theme: AppThemes = new AppThemes
    
    return useColorScheme() === "dark" ? Theme.DarkTheme : Theme.LightTheme;
}