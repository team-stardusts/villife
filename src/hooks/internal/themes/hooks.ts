import AppThemes from ".";
import { UseAppThemeReturnType } from "./types";

export default function useAppTheme(colorScheme?: 'light' | 'dark' | null | undefined): UseAppThemeReturnType {
    const Theme: AppThemes = new AppThemes

    return colorScheme === "dark" ? Theme.DarkTheme : Theme.LightTheme;
}