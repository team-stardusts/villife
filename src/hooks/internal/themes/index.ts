import ThemeTypes from "./types";

export class LightTheme implements ThemeTypes.ITheme {
}

export class DarkTheme implements ThemeTypes.ITheme{
}

export default class AppThemes implements ThemeTypes.IThemes {
    readonly LightTheme = new LightTheme;
    readonly DarkTheme = new DarkTheme;
}