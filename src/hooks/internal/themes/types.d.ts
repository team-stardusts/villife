declare namespace ThemeTypes {
    type test = "normal" | "italic" | undefined
    interface ITheme {
        colors: {
            pallet: any;
            colorFamily: {
                black: string;
                blue: string;
                darkgrey: string;
                green: string;
                grey: string;
                lightblue: string;
                lightgrey: string;
                red: string;
                white: string;
            }
        };
        css: {
            font: {
                universial: {
                    fontFamily: string;
                }
        }
        };
    };

    interface IThemes {
        DarkTheme: ITheme;
        LightTheme: ITheme;
    }
}

export declare type UseAppThemeReturnType = ThemeTypes.ITheme;

export default ThemeTypes;