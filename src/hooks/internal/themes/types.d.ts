declare namespace ThemeTypes {
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
            fontFamily: {
                universial: {
                    fontFamily: string;
                    fontStyle: string;
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